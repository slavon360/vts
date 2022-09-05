from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Category, SubCategory, SubSubCategory, Phone, Product

class ProductResource(resources.ModelResource):
    class Meta:
        model = Product

class ProductAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = ProductResource
    list_display = ('title', 'manufacturer', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title',)

# Register your models here.

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(SubSubCategory)
admin.site.register(Phone)
admin.site.register(Product, ProductAdmin)