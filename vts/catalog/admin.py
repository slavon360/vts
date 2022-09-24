from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Currency, Category, SubCategory, SubSubCategory, Phone, Product, ProductImage

class ProductImageResource(resources.ModelResource):
    class Meta:
        model = ProductImage

class ProductImageAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = ProductImageResource

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 4

class ProductResource(resources.ModelResource):
    class Meta:
        model = Product

class ProductAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = ProductResource
    inlines = [ ProductImageInline, ]
    list_display = ('title', 'manufacturer', 'created_at')
    list_filter = ('category', 'subcategory', 'subsubcategory', 'created_at')
    search_fields = ('title',)

# Register your models here.

admin.site.register(Currency)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(SubSubCategory)
admin.site.register(Phone)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)