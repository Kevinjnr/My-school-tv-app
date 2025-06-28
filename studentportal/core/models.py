from django.db import models
import uuid
from django.contrib.auth.hashers import make_password, check_password

class Student(models.Model):
    full_name = models.CharField(max_length=100, blank=False, null=False)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    matric_no = models.CharField(max_length=20, unique=True)
    paid = models.BooleanField(default=False)
    reference = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return f"{self.full_name} at {self.email}"



