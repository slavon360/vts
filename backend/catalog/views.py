import os
import datetime
import requests
import mimetypes
import schedule
from time import sleep
from PIL import Image
from operator import itemgetter
from django.shortcuts import render
from django.core.mail import send_mail
from rest_framework import status, generics
from decouple import config
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from django.conf import settings
from django.urls import reverse
from django.views.generic import DetailView, ListView
from .models import Category, Phone, Banner, Product, Customer, Order
from .serializers import ProductSerializer, ProductSearchSerializer 
from .forms import CheckoutForm, RepairOrderForm

# Create your views here.

nova_post_url = 'https://api.novaposhta.ua/v2.0/json/'
np_key = config('NOVA_POSHTA_API_KEY')
DEV_MODE = config('DEV_MODE') == 'True'
print('DEV_MODE: ', DEV_MODE)
# def schedulter_test():
# 	print('scheduler test')

# schedule.every().minute.do(schedulter_test)
# # schedule.run_pending()
# # Checks whether a scheduled task is pending to run or not
# while True:
# 	print('run-pending')
# 	schedule.run_pending()

# 	# set the sleep time to fit your needs
# 	sleep(60)

def get_base_width(device_width, image):
	image_width = image.size[0]
	recommended_img_width = int(device_width / 2.5)

	if device_width <= 768 and image_width > recommended_img_width:
		return recommended_img_width
	if device_width <= 992 and image_width > recommended_img_width:
		return recommended_img_width
	if device_width <= 1366 and image_width > recommended_img_width:
		return recommended_img_width
	if device_width <= 1920 and image_width > recommended_img_width:
		return int(recommended_img_width / 1.5)
	if device_width <= 3000 and image_width > recommended_img_width:
		return int(recommended_img_width / 1.5)
	if device_width <= 6000 and image_width > recommended_img_width:
		return int(recommended_img_width / 2.5)
	else: return image_width

def guess_file_type(file_path):
	file_type = mimetypes.guess_type(file_path)[0]

	if file_type is None:
		file_extention = file_path.split('.')[-1]
		
		return f'image/{file_extention}'
	else:
		return file_type

def resize_image_view(request, **kwargs):
    screen_width = int(request.GET.get('device-width', 50))
    device_width = int(request.COOKIES.get('device-width', 50)) or screen_width
    print('request.COOKIES: ', request.COOKIES)
    image_relative_path = request.path.split(settings.MEDIA_URL).pop(-1)
    image_path = f'{settings.MEDIA_ROOT}/{image_relative_path}'
    image_type = guess_file_type(image_path)
    print('image_type: ', image_type, image_path)
    image_format = image_type.split('/')[-1]
    image = Image.open(image_path)
    
    basewidth = get_base_width(device_width, image)
    width_percent = (basewidth/float(image.size[0]))
    height_size = int((float(image.size[1])*float(width_percent)))
    image = image.resize((basewidth, height_size), Image.Resampling.LANCZOS)
    response = HttpResponse(content_type=image_type)

    image.save(response, format=image_format)
    return response

def get_file_name(directory_path, extention = '.js'):
	current_file_path = os.path.abspath(__file__)
	current_directory_path = os.path.dirname(current_file_path)

	return [directory for directory in os.listdir(current_directory_path + directory_path) if directory.endswith(extention)][0]

def index(request):
	categories = Category.objects.all()
	banners = Banner.objects.all()
	hot_deal_products = Product.objects.filter(discount_end_date__gte = datetime.date.today())
	spare_parts_products = Product.objects.filter(category__name='Запчастини')[:10]
	boiler_products = Product.objects.filter(category__name='Водонагрівачі')[:10]
	gas_boiler_products = Product.objects.filter(category__name='Котли')[:10]
	phones = Phone.objects.all()
	js_name = get_file_name('/static/js/modules/homepage/dist')
	css_name = get_file_name('/static/styles/css/homepage', '.css')

	context = {
		'categories': categories,
		'banners': banners,
		'phones': phones,
		'hot_deal_products': hot_deal_products,
		'spare_parts_products': spare_parts_products,
		'boiler_products': boiler_products,
		'gas_boiler_products': gas_boiler_products,
		'js_name': js_name,
		'css_name': css_name
	}

	return render(request, 'index.html', context=context)

def shopping_cart(request):
	categories = Category.objects.all()
	phones = Phone.objects.all()
	breadcrumbs = Breadcrumbs()
	breadcrumbs_data = breadcrumbs.get_breadcrumbs(
		breadcrumbs,
		None,
		category = '',
		subcategory = '',
		subsubcategory = '',
		optional_title = 'Кошик'
	)
	js_name = get_file_name('/static/js/modules/shopping-cart/dist', '.main.js')

	context = {
		'categories': categories,
		'phones': phones,
		'breadcrumbs': breadcrumbs_data,
		'js_name': js_name,
		'css_name': f'shopping-cart.css',
	}
	return render(request, 'catalog/shopping-cart.html', context=context)

def checkout_page(request):
	categories = Category.objects.all()
	phones = Phone.objects.all()
	breadcrumbs = Breadcrumbs()
	breadcrumbs_data = breadcrumbs.get_breadcrumbs(
		breadcrumbs,
		None,
		category = '',
		subcategory = '',
		subsubcategory = '',
		optional_title = 'Оформлення замовлення'
	)
	js_name = get_file_name('/static/js/modules/checkout/dist')
	css_name = get_file_name('/static/styles/css/checkout', '.css')

	if request.method == 'POST':
		form = CheckoutForm(request.POST)
		if form.is_valid():
			name = form.cleaned_data['name']
			phone_number = form.cleaned_data['phone_number']
			shipping_address = form.cleaned_data['shipping_address']
			to = form.cleaned_data['email']

			# send_mail(
			# 	'Order is in process',
			# 	f'Hi, {name}!',
			# 	'viacheslav360@gmail.com',
			# 	[to]
			# )
			new_customer = Customer(
				name = name,
				phone_number = phone_number,
				email = to,
				shipping_address = shipping_address
			)
			details = request.POST.get('details')
			new_order = Order(
				name = name,
				phone_number = phone_number,
				email = to,
				shipping_address = shipping_address,
				customer = new_customer,
				details = details
			)

			new_customer.save()
			new_order.save()
			return HttpResponseRedirect(reverse('success-checkout'))
	else:
		form = CheckoutForm()
	
	context = {
		'categories': categories,
		'phones': phones,
		'breadcrumbs': breadcrumbs_data,
		'form': form,
		'js_name': js_name,
		'css_name': css_name
	}

	return render(request, 'catalog/checkout.html', context=context)

def checkout_success_page(request):
	categories = Category.objects.all()
	phones = Phone.objects.all()
	breadcrumbs = Breadcrumbs()
	breadcrumbs_data = breadcrumbs.get_breadcrumbs(
		breadcrumbs,
		None,
		category = '',
		subcategory = '',
		subsubcategory = '',
		optional_title = ''
	)
	js_name = get_file_name('/static/js/modules/success-checkout/dist')
	css_name = get_file_name('/static/styles/css/success-checkout', '.css')
	context = {
		'categories': categories,
		'phones': phones,
		'breadcrumbs': breadcrumbs_data,
		'js_name': js_name,
		'css_name': css_name
	}

	return render(request, 'catalog/success-checkout.html', context=context)


def repair_success_page(request):
	categories = Category.objects.all()
	phones = Phone.objects.all()
	breadcrumbs = Breadcrumbs()
	breadcrumbs_data = breadcrumbs.get_breadcrumbs(
		breadcrumbs,
		None,
		category = '',
		subcategory = '',
		subsubcategory = '',
		optional_title = ''
	)
	js_name = get_file_name('/static/js/modules/success-repair/dist')
	css_name = get_file_name('/static/styles/css/success-repair', '.css')
	context = {
		'categories': categories,
		'phones': phones,
		'breadcrumbs': breadcrumbs_data,
		'js_name': js_name,
		'css_name': css_name
	}

	return render(request, 'catalog/success-repair.html', context=context)

def about_us_page(request):
	categories = Category.objects.all()
	phones = Phone.objects.all()
	breadcrumbs = Breadcrumbs()
	breadcrumbs_data = breadcrumbs.get_breadcrumbs(
		breadcrumbs,
		None,
		category = '',
		subcategory = '',
		subsubcategory = '',
		optional_title = 'Про нас'
	)
	js_name = get_file_name('/static/js/modules/about-us/dist')
	css_name = get_file_name('/static/styles/css/about-us', '.css')
	context = {
		'categories': categories,
		'phones': phones,
		'breadcrumbs': breadcrumbs_data,
		'js_name': js_name,
		'css_name': css_name
	}

	return render(request, 'catalog/about-us.html', context=context)

def exchange_and_return_page(request):
	categories = Category.objects.all()
	phones = Phone.objects.all()
	breadcrumbs = Breadcrumbs()
	breadcrumbs_data = breadcrumbs.get_breadcrumbs(
		breadcrumbs,
		None,
		category = '',
		subcategory = '',
		subsubcategory = '',
		optional_title = 'Обмін та повернення'
	)
	js_name = get_file_name('/static/js/modules/exchange-and-return/dist')
	context = {
		'categories': categories,
		'phones': phones,
		'breadcrumbs': breadcrumbs_data,
		'js_name': js_name
	}

	return render(request, 'catalog/exchange-and-return.html', context=context)

def repair_page(request):
	categories = Category.objects.all()
	phones = Phone.objects.all()
	breadcrumbs = Breadcrumbs()
	breadcrumbs_data = breadcrumbs.get_breadcrumbs(
		breadcrumbs,
		None,
		category = '',
		subcategory = '',
		subsubcategory = '',
		optional_title = 'Ремонт та обслуговування'
	)
	js_name = get_file_name('/static/js/modules/repair/dist')

	if request.method == 'POST':
		form = RepairOrderForm(request.POST)
		if form.is_valid():
			name = form.cleaned_data['name']
			phone_number = form.cleaned_data['phone_number']
			shipping_address = form.cleaned_data['shipping_address']
			problem_description = form.cleaned_data['problem_description']
			model_name = form.cleaned_data['model_name']

			new_customer = Customer(
				name = name,
				phone_number = phone_number,
				shipping_address = shipping_address
			)

			new_order = Order(
				name = name,
				phone_number = phone_number,
				shipping_address = shipping_address,
				customer = new_customer,
				problem_description = problem_description,
				model_name = model_name
			)

			new_customer.save()
			new_order.save()
			return HttpResponseRedirect(reverse('success-repair'))
	else:
		form = RepairOrderForm()

	context = {
		'categories': categories,
		'phones': phones,
		'breadcrumbs': breadcrumbs_data,
		'js_name': js_name,
		'css_name': f'repair.css',
		'form': form
	}

	return render(request, 'catalog/repair.html', context=context)

def nova_poshta_settlements(request):
	request_data = request.POST
	body_request_data = {
		'csrfmiddlewaretoken': request_data['csrfmiddlewaretoken'],
		'apiKey': np_key,
		'modelName': 'Address',
		'calledMethod': 'searchSettlements',
		'methodProperties': {
			'CityName': request_data['CityName'],
			'Page': request_data['Page'],
			'Limit': request_data['Limit']
		}
	}

	r = requests.post(nova_post_url, json=body_request_data)
	return JsonResponse(r.json())

def nova_poshta_warehouses(request):
	request_data = request.POST
	body_request_data = {
		'csrfmiddlewaretoken': request_data['csrfmiddlewaretoken'],
		'apiKey': np_key,
		'modelName': 'Address',
		'calledMethod': 'getWarehouses',
		'methodProperties': {
			'CityName': request_data['CityName'],
			'Page': request_data['Page'],
			'Limit': request_data['Limit']
		}
	}

	r = requests.post(nova_post_url, json=body_request_data)
	return JsonResponse(r.json())

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

		if kwargs['optional_title']:
			breadcrumbs.append({ 'title': kwargs['optional_title'], 'link': '' })
		sorted_breadcrumbs = sorted(breadcrumbs, key=itemgetter('link'), reverse=True)
		sorted_breadcrumbs.insert(0, { 'title': 'Головна', 'link': '/' })
		return sorted_breadcrumbs

class ProductDetailView(DetailView, Breadcrumbs):
	model = Product

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		categ = self.object.category.all()[0] if self.object.category.all().count() > 0 else None
		subcateg = self.object.subcategory.all()[0] if self.object.subcategory.all().count() > 0 else None
		subsubcateg = self.object.subsubcategory.all()[0] if self.object.subsubcategory.all().count() > 0 else None
		category_id = getattr(categ, 'id') if categ else None
		subcategory_id = getattr(subcateg, 'id') if subcateg else None
		subsubcategory_id = getattr(subsubcateg, 'id') if subsubcateg else None
		js_name = get_file_name('/static/js/modules/product-detail/dist')
		css_name = get_file_name('/static/styles/css/product-detail', '.css')

		context['js_name'] = js_name
		context['css_name'] = css_name
		context['categories'] = Category.objects.all()
		context['phones'] = Phone.objects.all()
		context['breadcrumbs'] = self.get_breadcrumbs(
			self,
			None,
			category = category_id,
			subcategory = subcategory_id,
			subsubcategory = subsubcategory_id,
			optional_title = ''
		)
		return context

class ProductsSearchApiView(generics.ListAPIView):
	model = Product
	serializer_class = ProductSearchSerializer

	def get_queryset(self):
		title = self.request.query_params.get('title')

		products = Product.objects.filter(title__icontains=title)

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
		js_name = get_file_name('/static/js/modules/catalog/dist')
		css_name = get_file_name('/static/styles/css/catalog', '.css')
		context = super().get_context_data(**kwargs)

		context['js_name'] = js_name
		context['css_name'] = css_name
		context['categories'] = Category.objects.all()
		context['phones'] = Phone.objects.all()
		context['breadcrumbs'] = self.get_breadcrumbs(
			self,
			None,
			category = self.kwargs['category'],
			subcategory = self.kwargs['subcategory'],
			subsubcategory = self.kwargs['subsubcategory'],
			optional_title = ''
		)
		context['page_title'] = self.page_title
		context['url_params'] = self.kwargs
		context['sort_by'] = self.sort_by
		return context
