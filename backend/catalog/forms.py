from django import forms
from .models import Customer

class CheckoutForm(forms.ModelForm):
	class Meta:
		model = Customer
		fields = ('name', 'phone_number', 'email', 'shipping_address')
		error_messages = {
			'name': {
				'required': 'Введіть будь ласка своє ім\'я'
			},
			'phone_number': {
                'required': 'Введіть будь ласка номер телефону'
            }
		}

class RepairOrderForm(forms.ModelForm):
	problem_description = forms.CharField(max_length=999, required=False)
	model_name = forms.CharField(required=False)
	class Meta:
		model = Customer
		fields = ('name', 'phone_number', 'shipping_address')
		error_messages = {
			'name': {
				'required': 'Введіть будь ласка своє ім\'я'
			},
			'phone_number': {
                'required': 'Введіть будь ласка номер телефону'
            }
		}