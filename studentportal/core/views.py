from django.shortcuts import render, redirect
from .forms import StudentRegForm
from .models import Student
from django.conf import settings
import requests
from django.contrib import messages

def home(request):
    return render(request, 'core/home.html')

def register(request):
    if request.method == 'POST':
        form = StudentRegForm(request.POST)
        if form.is_valid():
            student = form.save(commit=False)
            student.set_password(form.cleaned_data['password'])
            student.save()
            print(f"Student {student.full_name} registered successfully.")
            # Continue with Paystack payment setup...
            amount = 15000 * 100  # Amount in kobo
            headers = {
                'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}',
                'Content-Type': 'application/json',
            }
            data = {
                'email': student.email,
                'amount': amount,
                'callback_url' : request.build_absolute_uri('/payment/callback/'),
            }
            response = requests.post('https://api.paystack.co/transaction/initialize', headers=headers, json=data)
            res_data = response.json()
            if res_data.get('status'):
                student.reference = res_data['data']['reference']
                student.save()
                return redirect(res_data['data']['authorization_url'])
    else:
        form = StudentRegForm()
    return render(request, 'core/register.html', {'form': form})

def paystack_callback(request):
    reference = request.GET.get('reference')
    if not reference:
        return render(request, 'core/payment_failed.html', {'error': 'No reference provided.'})
    headers = {
        'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}',
        'Content-Type': 'application/json',
    }
    response = requests.get(f'https://api.paystack.co/transaction/verify/{reference}', headers=headers)
    res_data = response.json()
    
    if res_data.get('data') and res_data['data']['status'] == 'success':
        try:
            student = Student.objects.get(reference=reference)
            student.paid = True
            student.save()
            request.session['student_id'] = student.id
            return redirect('view_slip')
        except Student.DoesNotExist:
            return render(request, 'core/payment_failed.html', {'error': 'Student not found.'})
    
    return render(request, 'core/payment_failed.html', {'error': 'Payment verification failed.'})

def view_slip(request):
    student_id = request.session.get('student_id')
    if not student_id:
        return redirect('login')
    student = Student.objects.get(id=student_id)
    if student.paid:
        return render(request, 'core/view_slip.html', {'student': student})
   
    messages.error(request, 'You have not completed the payment.')
    return redirect('register')

def student_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            student = Student.objects.get(email=email)
            if student.check_password(password):
                request.session['student_id'] = student.id
                if student.paid:
                    return redirect('view_slip')
               
                # Redirect to Paystack again
                amount = 15000 * 100  # Amount in kobo
                headers = {
                    'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}',
                    'Content-Type': 'application/json',
                    }
                data = {
                    'email': student.email,
                    'amount': amount,
                    'callback_url': request.build_absolute_uri('/payment/callback/'),
                }
                response = requests.post('https://api.paystack.co/transaction/initialize', headers=headers, json=data)
                res_data = response.json()
                if res_data.get('status'):
                    student.reference = res_data['data']['reference']
                    student.save()
                    return redirect(res_data['data']['authorization_url'])
                else:
                    messages.error(request, "Unable to initiate payment. Please try again.")
            else:
                messages.error(request, 'Invalid email or password.')
        except Student.DoesNotExist:
            messages.error(request, 'Student does not exist.')
    return render(request, 'core/login.html')


        