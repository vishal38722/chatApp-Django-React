from channels.generic.websocket import AsyncWebsocketConsumer
import json
from api.token_authentication_permission import CustomTokenAuthentication
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from api.models import Message
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from asgiref.sync import sync_to_async
import datetime

User=get_user_model()

class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        request_user = self.scope['user']
        if request_user.is_authenticated:  
            chat_with_user = self.scope['url_route']['kwargs']['id']
            user_ids = [int(request_user.id), int(chat_with_user)]
            user_ids = sorted(user_ids)
            self.room_group_name = f"chat_{user_ids[0]}-{user_ids[1]}"

            await self.channel_layer.group_add(
                    self.room_group_name,
                    self.channel_name
                )
            # print(f"Added to group: {self.room_group_name}") 
            await self.accept()
            await self.send_existing_chat_history()

    async def send_existing_chat_history(self):
        # Retrieve existing chat history from the database
        sender = self.scope['user']
        receiver_id = self.scope['url_route']['kwargs']['id']

        # Convert receiver_id to an integer (if it's not already)
        try:
            receiver_id = int(receiver_id)
        except ValueError:
            # print("Invalid receiver_id. It should be a valid integer.")
            return

        # Use database_sync_to_async for synchronous database operations
        try:
            receiver = await sync_to_async(User.objects.get)(id=receiver_id)
        except ObjectDoesNotExist:
            # print(f"User with ID {receiver_id} does not exist.")
            return
        

        chat_history_queryset = await database_sync_to_async(Message.objects.filter)(
            sender__in=[sender, receiver],
            receiver__in=[sender, receiver]
        )
        chat_history = await sync_to_async(list)(chat_history_queryset)
        chat_history = sorted(chat_history, key=lambda x: x.timestamp)

        sender = {
            'id': sender.id,
            'first_name': sender.first_name,
            'last_name': sender.last_name,
            'email': sender.email,
        }
        receiver = {
            'id': receiver.id,
            'first_name': receiver.first_name,
            'last_name': receiver.last_name,
            'email': receiver.email,
        }
        message_content = []
        for chat in chat_history:
            message_content += chat.content
        message_content = sorted(message_content, key=lambda x: x['timestamp'])
        await self.send(text_data=json.dumps({
            "message": message_content
        }))

        # Retrieve existing chat history from the database
        sender = self.scope['user']
        receiver_id = self.scope['url_route']['kwargs']['id']

        # Convert receiver_id to an integer (if it's not already)
        try:
            receiver_id = int(receiver_id)
        except ValueError:
            print("Invalid receiver_id. It should be a valid integer.")
            return

        # Use database_sync_to_async for synchronous database operations
        try:
            receiver = await sync_to_async(User.objects.get)(id=receiver_id)
        except ObjectDoesNotExist:
            print(f"User with ID {receiver_id} does not exist.")
            return

        chat_history_queryset = await database_sync_to_async(Message.objects.filter)(
            sender__in=[sender, receiver],
            receiver__in=[sender, receiver]
        )
        chat_history = await sync_to_async(list)(chat_history_queryset)

        # Sort the list based on timestamp
        chat_history = sorted(chat_history, key=lambda x: x.timestamp)

        # Send each message to the user
        for chat in chat_history:
            await self.send(text_data=json.dumps({
                "message": chat.content
            }))
        
    async def receive(self, text_data):
        # Receive message from WebSocket
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender = {
            'id': self.scope['user'].id,
            'first_name': self.scope['user'].first_name,
            'last_name': self.scope['user'].last_name,
            'email': self.scope['user'].email,
        }
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        message_content = json.dumps({
            "message": message,
            "timestamp": timestamp,
            "sender": sender['id']
        })
        message_content = json.loads(message_content)
        await self.save_message(message_content)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message_content
            }
        )

    @database_sync_to_async
    def save_message(self, message_content):
        sender = self.scope['user']
        receiver_id = self.scope['url_route']['kwargs']['id']
        # receiver = User.objects.get(id=receiver_id)
        receiver = (User.objects.get)(id=receiver_id)

        # Check if a chat history already exists between sender and receiver
        chat_history_exists = Message.objects.filter(
            sender=sender,
            receiver=receiver
        ).exists()

        if not chat_history_exists:
            # If chat history doesn't exist, create it
            Message.objects.create(
                sender=sender,
                receiver=receiver,
                content=[message_content]
            )
        else:
            # If chat history exists, update the existing message or handle as needed
            # For example, you might want to append the new message to the existing chat history
            existing_chat = Message.objects.filter(sender=sender, receiver=receiver).first()
            if isinstance(existing_chat.content, str):
                existing_chat.content = [json.loads(existing_chat.content)]
            existing_chat.content.append(message_content)
            existing_chat.save()

            
    # Receive message from room group
    async def chat_message(self, event):
        message_content = event['message']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "message": message_content
        }))


    
