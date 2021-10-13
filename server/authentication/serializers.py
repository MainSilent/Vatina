from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password')

    def validate_password(self, password):
        return make_password(password)

    def change_password(self, instance, new_password):
        instance.password = make_password(new_password)
        instance.save()