from rest_framework import serializers
from .models import Product, ProductImage
class ProductImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProductImage
		fields = ('image_url',)
class ProductSerializer(serializers.ModelSerializer):
	first_image = serializers.SerializerMethodField()

	def get_first_image(self, product):
		return ProductImageSerializer(product.first_image()).data
	class Meta:
		model = Product
		fields = [
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
			'first_image'
		]