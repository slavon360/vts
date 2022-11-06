from rest_framework import serializers
from .models import Product, ProductImage
class ProductImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProductImage
		fields = ('image_url',)
class ProductImagesListSerializer(serializers.ModelSerializer):
	image_url = serializers.ImageField(use_url=True)
	class Meta:
		model = ProductImage
		fields = ['image_url']
class ProductSerializer(serializers.ModelSerializer):
	first_image = serializers.SerializerMethodField()
	images_list = serializers.SerializerMethodField()

	def get_first_image(self, product):
		return ProductImageSerializer(product.first_image()).data
	def get_images_list(self, product):
		image = product.images.all()
		return ProductImagesListSerializer(instance=image, many=True).data
	class Meta:
		model = Product
		fields = (
			'title',
			'article',
			'manufacturer',
			'price',
			'show_price_in_hrn',
			'available',
			'discount_price',
			'get_actual_price',
			'get_absolute_url',
			'get_actual_discount_price',
			'first_image',
			'description',
			'images_list'
		)