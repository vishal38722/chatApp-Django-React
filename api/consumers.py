from channels.generic.websocket import AsyncWebsocketConsumer
class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print(" TESTING REDIS CHANNEL")
        await self.accept()