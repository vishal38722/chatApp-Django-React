"""
ASGI config for chatapp project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter,URLRouter
from api.route import websocket_urlpatterns
from channels.auth import AuthMiddlewareStack
from api.channel_middleware import WebsocketMiddleware
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chatapp.settings")

application = get_asgi_application()

application=ProtocolTypeRouter({
    "http":application,
    "websocket":WebsocketMiddleware(AuthMiddlewareStack(URLRouter(websocket_urlpatterns)))
})  