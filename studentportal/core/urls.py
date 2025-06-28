from django.urls import path
from .views import home, register, paystack_callback,student_login, view_slip

urlpatterns = [
    path('', home, name='home'),
    path('register/', register, name='register'),
    path('payment/callback/', paystack_callback, name='paystack_callback'),
    path('login/', student_login, name='login'),
    path('view-slip/', view_slip, name='view_slip'),
]
