(function ($) {
	"use strict";
	class ShoppingCart {
		static shopping_cart_key = 'shopping-cart-vts-service';
		constructor() {
			this.addProductToCartHandler = null;
			this.shopping_cart_data = [];
			this.add_to_cart_btns = document.querySelectorAll('.add-product-to-cart');
			this.products_quantity_element = document.querySelector('.hm-minicart .cart-item-count');
			this.products_sum_element = document.querySelector('.hm-minicart .cart-sum');
			this.products_counter = null;
			this.getShoppingCartData();
			this.updateProductsCounterAndSum();
			this.bindListeners();
		}
		updateProductsCounterAndSum() {
			this.products_counter = this.shopping_cart_data.reduce((result, { qty, price }) => ({
				qty: result.qty + Number(qty),
				sum: Math.round(((result.sum + Number(price) * Number(qty)) + Number.EPSILON) * 100) / 100
			}), { qty: 0, sum: 0 });

			this.products_quantity_element.textContent = this.products_counter.qty;
			this.products_sum_element.textContent = `${this.products_counter.sum} грн.`;
		}
		getShoppingCartData() {
			const cart_data = JSON.parse(localStorage.getItem(ShoppingCart.shopping_cart_key));

			this.shopping_cart_data = cart_data || [];
		}
		setShoppingCartData(data) {
			const stringified_data = JSON.stringify(data);

			this.shopping_cart_data = data;
			localStorage.setItem(ShoppingCart.shopping_cart_key, stringified_data);
		}
		addProductToCart(added_product) {
			const existed_product = this.shopping_cart_data.find(({title}) => title === added_product.title);
			const product = existed_product ? { ...existed_product, qty: ++existed_product.qty } : added_product;

			this.shopping_cart_data = [
				...this.shopping_cart_data.filter(({title}) => title !== product.title),
				product
			];
			this.setShoppingCartData(this.shopping_cart_data);
			this.updateProductsCounterAndSum();
		}
		bindListeners() {
			this.add_to_cart_btns.forEach(elm => {
				const product_data = {
					title: elm.getAttribute('data-product-title'),
					qty: elm.getAttribute('data-product-qty'),
					price: elm.getAttribute('data-product-price')
				};

				this.addProductToCartHandler = this.addProductToCart.bind(this, product_data);
				elm.addEventListener('click', this.addProductToCartHandler);
			});
		}
		unbindListeners() {
			this.add_to_cart_btns.forEach(elm => {
				elm.removeEventListener('click', this.addProductToCartHandler);
			});
		}
	}

	new ShoppingCart();
})(jQuery)