from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from django.contrib.auth import get_user_model
from api.serializers import UserGetSerializer
from rest_framework.response import Response
from rest_framework.permissions import BasePermission
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from rest_framework import status
from rest_framework.views import APIView
# from rest_framework.permissions import AllowAny  
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import update_session_auth_hash
from .serializers import ChangePasswordSerializer

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
    
from rest_framework.permissions import BasePermission

class IsCustomAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated


User=get_user_model()
@api_view(["GET"])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsCustomAuthenticated])
def get_user_list(request):
    try:
        user = request.user
        user_obj = User.objects.exclude(id=user.id)
        serializer = UserGetSerializer(user_obj, many=True)
        return Response(serializer.data, status=200)
    except Exception as e:
        print("Error in getting user list", str(e))
        return Response({"error": "Error in getting user list"}, status=400)
    
@api_view(["POST"])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsCustomAuthenticated])
def change_password(request):
    # permission_classes = [AllowAny]
    # permission_classes = ([IsCustomAuthenticated])

    # def post(self, request):
    serializer = ChangePasswordSerializer(data=request.data)

    if serializer.is_valid():
        user = request.user
        old_password = serializer.validated_data['old_password']
        new_password = serializer.validated_data['new_password']

        # Check old password
        if not user.check_password(old_password):
            return Response({'detail': 'Old password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

        # Change the password
        user.set_password(new_password)
        user.save()

        # Update session auth hash for the current session
        update_session_auth_hash(request, user)

        return Response({'detail': 'Password changed successfully.'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
