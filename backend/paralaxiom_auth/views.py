from knox.auth import AuthToken
from .serializers import RegisterSerializer
from rest_framework import status
from knox.auth import TokenAuthentication
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
@api_view(['POST'])
def login_api(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = User.objects.filter(email=email,password=password)
    print(user)

    # user = authenticate(request,username=username, password=password)
    if user:
        # if(AuthToken.objects.filter(token))
        _, token = AuthToken.objects.create(user[0])
        return Response({
            'user_info':{
                'email':email
            },
                'token': token})
    else:
        return Response({'error': 'Invalid credentials'}, status=401)



@api_view(['GET'])
def get_user_data(request):
    user=request.user
    
    if user.is_authenticated:
          return Response({
            'user_info':{
                'id':user.id,
                'username':user.username,
                'email':user.email
            },
        })
    

@api_view(['POST'])
def Register_api(request):
      
      serializer=RegisterSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      user=serializer.save()
      _,token=AuthToken.objects.create(user)
      return Response({
            'user_info':{
                'id':user.id,
                'username':user.username,
                'email':user.email
            },
            'token':token
        }
        )
