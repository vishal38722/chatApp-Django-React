from rest_framework.permissions import BasePermission
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
User=get_user_model()
class CustomTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return None

        try:
            token = auth_header.split()[1]
            user = User.objects.get(auth_token__key=token)
        except (IndexError, User.DoesNotExist):
            raise AuthenticationFailed('Invalid token')

        return (user, None)
    
    @database_sync_to_async
    def authenticate_websocket(self, scope, token):
        try:
            user = User.objects.get(auth_token__key=token)
            return user
        except User.DoesNotExist:
            return None
    
from rest_framework.permissions import BasePermission

class IsCustomAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated


