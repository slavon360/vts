from django.urls import path
from . import views

urlpatterns = [
	path('', views.index, name='index'),
	path('shopping-cart', views.shopping_cart),
	path('about-us', views.about_us_page),
	path('exchange-and-return', views.exchange_and_return_page),
	path('repair', views.repair_page),
	path('checkout/success', views.checkout_success_page, name='success-checkout'),
	path('repair/success', views.repair_success_page, name='success-repair'),
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
    path('image/<img_folder>/<img_name>', views.resize_image_view, name='resize_image'),
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