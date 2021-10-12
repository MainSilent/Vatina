from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from .models import User

class Register(APIView):
    def post(self, request):
        user = User.objects.create(**request.data)
        token = Token.objects.create(user=user)
        return Response(data={'token': token.key})

class Login(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            if email:
                pass
        except:
            raise AuthenticationFailed('Email field is required')

        password = request.data['password']
        
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('Invalid login credentials')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Invalid login credentials')

        try:
            token = Token.objects.create(user=user)
        except:
            token = Token.objects.get(user=user)
            
        return Response(data={'token': token.key})

class Logout(APIView):
    permission_classes = (IsAuthenticated, )
    
    def post(self, request):
        user = User.objects.get(**request.data)
        token = Token.objects.get(user=user)
        token.delete()
        return Response(status=200)