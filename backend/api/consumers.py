from channels.generic.websocket import AsyncWebsocketConsumer
import json
from api.token_authentication_permission import CustomTokenAuthentication
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from api.models import Message
from django.contrib.auth import get_user_model
import datetime

User=get_user_model()

class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        request_user = self.scope['user']
        print(request_user)
        print("-----------------------------")
        if request_user.is_authenticated:  
            chat_with_user = self.scope['url_route']['kwargs']['id']
            user_ids = [int(request_user.id), int(chat_with_user)]
            user_ids = sorted(user_ids)
            self.room_group_name = f"chat_{user_ids[0]}-{user_ids[1]}"

            await self.channel_layer.group_add(
                    self.room_group_name,
                    self.channel_name
                )
            print(f"Added to group: {self.room_group_name}") 
            await self.accept()

    async def receive(self, text_data):
        # Receive message from WebSocket
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # sender = self.scope['user']
        # print("Sender: ", sender)
        sender = {
            'id': self.scope['user'].id,
            'first_name': self.scope['user'].first_name,
            'last_name': self.scope['user'].last_name,
            'email': self.scope['user'].email,
            # Add other user fields as needed
        }
        print("Sender: ", sender)
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        print(f"Received message from client: {message}")
        await self.save_message(message)

        
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender,
                'timestamp': timestamp
            }
        )
    @database_sync_to_async
    def save_message(self, message_content):
        sender = self.scope['user']
        receiver_id = self.scope['url_route']['kwargs']['id']
        receiver = User.objects.get(id=receiver_id)

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
                content=message_content
            )
        else:
            # If chat history exists, update the existing message or handle as needed
            # For example, you might want to append the new message to the existing chat history
            existing_chat = Message.objects.filter(sender=sender, receiver=receiver).first()
            existing_chat.content += f"\n{message_content}"
            existing_chat.save()

            
    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']
        timestamp = event['timestamp']
        type = event['type']
        print(type)
        print(f"Broadcasting message to clients: {message}")
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "message": message,
            "sender": sender,
            "timestamp": timestamp
        }))


    
