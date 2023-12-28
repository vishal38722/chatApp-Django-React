from rest_framework import serializers,validators
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username","email", "password")

        extra_kwargs={
            "password": {"write_only": True},
            "email": {
                "required": True,
                "allow_blank":False,
                "validators":[
                    validators.UniqueValidator(
                        User.objects.all(), "Auser with email id already exist"

                    )
                ]
            }
        }

    def create(self, validated_data):
        username=validated_data.get('username')
        email=validated_data.get('email')
        password=validated_data.get('password')
        user=User.objects.create(
            username=username,
            email=email,
            password=password
        )
        return user
