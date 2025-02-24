from rest_framework import serializers
from .models import User
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'created_at']
        extra_kwargs = {
            'password': {'write_only': True},
            'created_at': {'read_only': True}
        }

    def validate_name(self, value):
        if not re.match(r'^[A-Za-zÀ-ÖØ-öø-ÿ ]+$', value):
            raise serializers.ValidationError("O nome deve conter apenas letras e espaços.")
        return value
