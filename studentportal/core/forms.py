from django import forms
from .models import Student

class StudentRegForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ['full_name', 'email', 'password', 'matric_no']
        widgets = {
            'password': forms.PasswordInput(),
        }