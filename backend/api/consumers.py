from channels.generic.websocket import AsyncWebsocketConsumer
import json
from api.token_authentication_permission import CustomTokenAuthentication
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async

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
        print(f"Received message from client: {message}")

        
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        print(f"Broadcasting message to clients: {message}")
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "message": message
        }))


    
