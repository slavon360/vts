import datetime
from operator import itemgetter
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.views.generic import DetailView, ListView
from .models import Category, Phone, Banner, Product
from .serializers import ProductSerializer, ProductSearchSerializer 

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

def shopping_cart(request):
	return render(request, 'catalog/shopping-cart.html')

class Breadcrumbs():
	def get_breadcrumbs(self, *args, **kwargs):
		breadcrumbs = []
		def add_category_breadcrumb(categ):
			if str(categ.id) == str(kwargs['category']):
				if hasattr(self, 'page_title'):	
					self.page_title += categ.name
				breadcrumbs.append({ 'title': categ.name, 'link': f'products-catalog/{categ.id}' })

		def add_subcategory_breadcrumb(categ):
			if str(categ.id) == str(kwargs['category']):
				for subcateg in categ.subcategory_set.all():
					if str(subcateg.id) == str(kwargs['subcategory']):
						if hasattr(self, 'page_title'):
							self.page_title += subcateg.name
						breadcrumbs.append({
							'title': subcateg.name,
							'link': '',
							'id': subcateg.id
						})
		def add_subsubcategory_breadcrumb(subcateg):
			for subsubcateg in subcateg.subsubcategory_set.all():
				if str(subsubcateg.id) == str(kwargs['subsubcategory']):
					already_exist = next((item for item in breadcrumbs if str(item['id']) == str(kwargs['subsubcategory'])), None)
					if not already_exist:
						if hasattr(self, 'page_title'):
							self.page_title += f' {subsubcateg.name}'
						breadcrumbs.append({
							'title': subsubcateg.name,
							'id': subsubcateg.id,
							'link': ''
						})

		def add_subsubcategory_and_subcategory_breadcrumb(categ):
			for subcateg in categ.subcategory_set.all():
				if str(subcateg.id) == str(kwargs['subcategory']):
					if hasattr(self, 'page_title'):
						self.page_title += subcateg.name
					breadcrumbs.append({
						'title': subcateg.name,
						'link': f'products-subcatalog/{categ.id}/{subcateg.id}',
						'id': subcateg.id
					})
					add_subsubcategory_breadcrumb(subcateg)

		for categ in Category.objects.all():
			if kwargs['category'] and not kwargs['subcategory']:
				add_category_breadcrumb(categ)
			elif kwargs['subcategory'] and kwargs['subsubcategory']:
				add_subsubcategory_and_subcategory_breadcrumb(categ)
			elif kwargs['category'] and kwargs['subcategory']:
				add_category_breadcrumb(categ)
				add_subcategory_breadcrumb(categ)

		sorted_breadcrumbs = sorted(breadcrumbs, key=itemgetter('link'), reverse=True)
		sorted_breadcrumbs.insert(0, { 'title': 'Головна', 'link': '/' })
		return sorted_breadcrumbs

class ProductDetailView(DetailView, Breadcrumbs):
	model = Product

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		categ = self.object.category.all()[0]
		subcateg = self.object.subcategory.all()[0]
		subsubcateg = self.object.subsubcategory.all()[0]
		category_id = getattr(categ, 'id')
		subcategory_id = getattr(subcateg, 'id')
		subsubcategory_id = getattr(subsubcateg, 'id')

		context['categories'] = Category.objects.all()
		context['phones'] = Phone.objects.all()
		context['breadcrumbs'] = self.get_breadcrumbs(
			self,
			None,
			category = category_id,
			subcategory = subcategory_id,
			subsubcategory = subsubcategory_id
		)
		return context

class ProductsSearchApiView(generics.ListAPIView):
	model = Product
	serializer_class = ProductSearchSerializer

	def get_queryset(self):
		title = self.request.query_params.get('title')

		products = Product.objects.filter(title__icontains=title)
		print(title)
		return products

class ProductsCatalogApiView(generics.ListAPIView):
	model = Product
	serializer_class = ProductSerializer

	def get_queryset(self):
		sort_by = self.request.query_params.get('sort_by')
		category_id = self.request.query_params.get('category_id')
		subcategory_id = self.request.query_params.get('subcategory_id')
		subsubcategory_id = self.request.query_params.get('subsubcategory_id')
		products = Product.objects
		if category_id and category_id.strip():
			products = Product.objects.filter(category__in=[category_id])
		if subcategory_id and subcategory_id.strip():
			products = products.filter(subcategory__in=[subcategory_id])
		if subsubcategory_id and subsubcategory_id.strip():
			products = products.filter(subsubcategory__in=[subsubcategory_id])

		if 'rating' in sort_by and 'descending' in sort_by:
			products = products.order_by('-created_at')
		elif 'price' in sort_by and 'descending' in sort_by:
			products = products.order_by('-price')
		else:
			products = products.order_by('price')		

		return products

class ProductsCatalogView(ListView, Breadcrumbs):
	model = Product
	paginate_by = 12
	orphans = 4
	template_name = 'catalog/products_catalog.html'
	context_object_name = 'products_catalog'
	page_title = 'VTS | '
	sort_by = ''

	def get_queryset(self):
		queryset = super().get_queryset()
		category = self.kwargs['category']
		subcategory = self.kwargs['subcategory']
		subsubcategory = self.kwargs['subsubcategory']
		self.sort_by = self.request.GET.get('sort_by', '')

		if category:
			queryset = queryset.filter(category__in=[category])
		if subcategory:
			queryset = queryset.filter(subcategory__in=[subcategory])
		if subsubcategory:
			queryset = queryset.filter(subsubcategory__in=[subsubcategory])
		if 'rating' in self.sort_by and 'descending' in self.sort_by:
			queryset = queryset.order_by('-created_at')
		elif 'price' in self.sort_by and 'descending' in self.sort_by:
			queryset = queryset.order_by('-price')
		else:
			queryset = queryset.order_by('price')

		return queryset
	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)

		context['categories'] = Category.objects.all()
		context['phones'] = Phone.objects.all()
		context['breadcrumbs'] = self.get_breadcrumbs(
			self,
			None,
			category = self.kwargs['category'],
			subcategory = self.kwargs['subcategory'],
			subsubcategory = self.kwargs['subsubcategory']
		)
		context['page_title'] = self.page_title
		context['url_params'] = self.kwargs
		context['sort_by'] = self.sort_by
		return context
