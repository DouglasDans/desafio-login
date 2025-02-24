from django.db import models
from django.core.validators import RegexValidator

class User(models.Model):
    name = models.CharField(
        max_length=100,
        validators=[RegexValidator(regex='^[A-Za-zÀ-ÖØ-öø-ÿ ]+$')]
    )
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
