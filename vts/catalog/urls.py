from django.urls import path
from . import views

urlpatterns = [
	path('', views.index, name='index'),
	path('shopping-cart', views.shopping_cart),
	path('checkout/success', views.checkout_success_page, name='success-checkout'),
	path('checkout', views.checkout_page),
	path('products/<uuid:pk>', views.ProductDetailView.as_view(), name='product-detail'),
	path(
		'products-catalog/<category>/',
		views.ProductsCatalogView.as_view(),
		kwargs={
			'subcategory': None,
			'subsubcategory': None
		}
	),
	path(
		'products-subcatalog/<category>/<subcategory>/',
		views.ProductsCatalogView.as_view(),
		kwargs={
			'subsubcategory': None
		}
	),
	path(
		'products-subsubcatalog/<subcategory>/<subsubcategory>/',
		views.ProductsCatalogView.as_view(),
		kwargs={
			'category': None
		}
	),
	path(
		'products-catalog/api',
		views.ProductsCatalogApiView.as_view()
	),
	path(
		'products-search/api',
		views.ProductsSearchApiView.as_view()
	),
	path('external/nova-poshta/search-settlements/api', views.nova_poshta_settlements),
	path('external/nova-poshta/search-warehouses/api', views.nova_poshta_warehouses)
]