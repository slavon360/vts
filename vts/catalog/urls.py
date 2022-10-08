from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('products/<uuid:pk>', views.ProductDetailView.as_view(), name='product-detail')
]