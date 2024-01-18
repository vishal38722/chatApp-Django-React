from .serializers import UserSerializer,LoginSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model


@api_view(['POST'])
def login_api(request):
    serializer=LoginSerializer(data=request.data)
    if serializer.is_valid():
        user_id = serializer.validated_data.get('id')
        try:
            user = get_user_model().objects.get(id=user_id)  # Retrieve the user based on 'user_id'
            token, _ = Token.objects.get_or_create(user=user)

            return Response({
                'message': "Login Successful",
                'user_id': user.id,  # Include the user ID in the response
                'First Name': user.first_name,
                'Last Name': user.last_name,
                'token': token.key  # Include token key in the response
            })

        except get_user_model().DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def Register_api(request):
      serializer=UserSerializer(data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=201)
      return Response(serializer.errors,400)
