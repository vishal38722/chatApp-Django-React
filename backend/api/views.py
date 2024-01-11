from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from django.contrib.auth import get_user_model
from api.serializers import UserGetSerializer
from rest_framework.response import Response
from .token_authentication_permission import IsCustomAuthenticated, CustomTokenAuthentication

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