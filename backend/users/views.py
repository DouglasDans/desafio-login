from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from .models import User
from .serializer import UserSerializer
from .services import UserService

class UserView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        user = UserService.register_user(request.data)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {"message": "Email e senha são obrigatórios"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = UserService.get_user_by_email(email)
        
        if not user:
            return Response(
                {"message": "E-mail inexistente",
                 "itemError": "email"
                 },
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if not check_password(password, user.password):
            return Response(
                {"message": "Senha Inválida","itemError": "password"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"message": "Login bem-sucedido"},
            status=status.HTTP_200_OK
        )