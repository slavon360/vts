import datetime
from django.shortcuts import render
from .models import Category, Phone, SubSubCategory, Product

# Create your views here.

def index(request):
    categories = Category.objects.all()
    hot_deal_products = Product.objects.filter(discount_end_date__gte = datetime.date.today())
    phones = Phone.objects.all()

    print('hot_deal_products: ', hot_deal_products.count())
    context = {
        'categories': categories,
        'phones': phones,
        'hot_deal_products': hot_deal_products
    }

    return render(request, 'index.html', context=context)