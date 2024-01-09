from django.urls import path
from .consumers import PersonalChatConsumer
websocket_urlpatterns=[
    path("ws/api/<int:id>/",PersonalChatConsumer.as_asgi())
]