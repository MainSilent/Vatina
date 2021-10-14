import os
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from django.core.files.storage import default_storage as storage
from .serializers import UserSerializer

class Register(APIView):
    throttle_scope = 'register'

    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            token = Token.objects.create(user=user)
            return Response({'token': token.key})

        return Response({'message': user_serializer.errors}, status=400)

class Login(APIView):
    throttle_scope = 'login'

    def post(self, request):
        user = authenticate(email=request.data.get('email'), password=request.data.get('password'))
        if user is None:
            raise AuthenticationFailed('Invalid login credentials')

        try:
            token = Token.objects.create(user=user)
        except:
            token = Token.objects.get(user=user)
            
        return Response({'token': token.key})

class Logout(APIView):
    permission_classes = (IsAuthenticated, )
    
    def post(self, request):
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response(status=204)

class ChangePassword(APIView):
    permission_classes = (IsAuthenticated, )
    
    def put(self, request):
        new_password = request.data.get('new_password')
        UserSerializer.change_password(None, request.user, new_password)
        return Response(status=204)

class UploadAvatar(APIView):
    permission_classes = (IsAuthenticated, )
    
    def put(self, request):
        new_avatar = request.data.get('file')
        avatar_ext = new_avatar.content_type.split('/')[-1]
        path = f"{settings.STATIC_URL}/{request.user.id}.png"
 
        if avatar_ext not in ['jpg', 'jpeg', 'png']:
            return Response({'error': 'Your avatar should be png or jpeg'}, status=200)

        if new_avatar.size > 2000000:
            return Response({'error': 'Your avatar is larger than 2MB'}, status=200)

        if os.path.exists(path):
            os.remove(path)

        storage.save(path, new_avatar)
        return Response(status=204)