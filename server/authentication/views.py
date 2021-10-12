from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer

class Register(APIView):
    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            token = Token.objects.create(user=user)
            return Response({'token': token.key})

        return Response({'message': user_serializer.errors}, status=400)

class Login(APIView):
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
        return Response(status=200)