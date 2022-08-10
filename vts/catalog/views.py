from django.shortcuts import render
from .models import Category, Phone

# Create your views here.

def index(request):
    categories = Category.objects.all()
    phones = Phone. objects.all()

    context = {
        'categories': categories,
        'phones': phones
    }

    return render(request, 'index.html', context=context)