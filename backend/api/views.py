from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from django.contrib.auth import get_user_model
from api.serializers import UserGetSerializer
from rest_framework.response import Response
from .token_authentication_permission import IsCustomAuthenticated, CustomTokenAuthentication

from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import update_session_auth_hash
from .serializers import ChangePasswordSerializer

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

# @api_view(["GET"])
# @authentication_classes([CustomTokenAuthentication])
# @permission_classes([IsCustomAuthenticated])
# def get_user_data(request):
#     try:
#         user = request.user
#         serializer = UserGetSerializer(User.objects.get(id=user.id), many=True)
#         return Response(serializer.data, status=200)
#     except Exception as e:
#         print("Error in getting user data", str(e))
#         return Response({"error": "Error in getting user list"}, status=400)
    
@api_view(["POST"])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsCustomAuthenticated])
def change_password(request):
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

@api_view(['GET'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsCustomAuthenticated])
def get_user_data(request):
    user = request.user

    return Response({
        'id': user.id,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
    })