from .models import User
from .serializer import UserSerializer

class UserService:
    @staticmethod
    def register_user(data):
        serializer = UserSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            # Lógica adicional aqui (ex: hash de senha)
            return serializer.save()
    
    @staticmethod
    def get_users():
        return User.objects.all()

    @staticmethod
    def get_user_by_password(password):
        return User.objects.filter(password=password).first()
    
    @staticmethod
    def get_user_by_email(email):
        return User.objects.filter(email=email).first()