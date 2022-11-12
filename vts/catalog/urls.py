from django.urls import path
from . import views

urlpatterns = [
	path('', views.index, name='index'),
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
	)
]