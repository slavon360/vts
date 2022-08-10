from django.contrib import admin
from .models import Category, SubCategory, SubSubCategory, Phone

# Register your models here.

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(SubSubCategory)
admin.site.register(Phone)