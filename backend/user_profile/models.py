from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255, default='')
    ldap = models.CharField(max_length=10, default='')

    def __str__(self):
        return self.ldap
