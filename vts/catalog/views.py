from django.shortcuts import render
from .models import Category, Phone, SubSubCategory, Product

# Create your views here.

def index(request):
    categories = Category.objects.all()
    products = Product.objects.all()
    # phones = Phone.objects.all()
    subsubcategories = SubSubCategory.objects.all()
    # image_field = getattr(phones[0], 'image')
    subcat_field = getattr(subsubcategories[0], 'subcategory').all()
    product_field = getattr(products[0], 'subcategory').all()
    for field in subcat_field:
        print(field)
        print(type(field))
    
    print('product fields: ')
    for product_f in product_field:
        print(product_f)
    # print('subcat_field')
    # print(subcat_field)

    context = {
        'categories': categories,
        # 'phones': phones
    }

    return render(request, 'index.html', context=context)