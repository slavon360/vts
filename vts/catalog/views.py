import datetime
from django.shortcuts import render
from django.views.generic import DetailView
from .models import Category, Phone, Banner, Product

# Create your views here.

def index(request):
    categories = Category.objects.all()
    banners = Banner.objects.all()
    hot_deal_products = Product.objects.filter(discount_end_date__gte = datetime.date.today())
    spare_parts_products = Product.objects.filter(category__name='Запчастини')[:10]
    boiler_products = Product.objects.filter(category__name='Водонагрівачі')[:10]
    gas_boiler_products = Product.objects.filter(category__name='Котли')[:10]
    phones = Phone.objects.all()

    context = {
        'categories': categories,
        'banners': banners,
        'phones': phones,
        'hot_deal_products': hot_deal_products,
        'spare_parts_products': spare_parts_products,
        'boiler_products': boiler_products,
        'gas_boiler_products': gas_boiler_products
    }

    return render(request, 'index.html', context=context)

class ProductDetailView(DetailView):
    model = Product

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        context['phones'] = Phone.objects.all()
        return context