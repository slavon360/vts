(function ($) {
	"use strict";
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}
	class ShoppingCart {
		static shopping_cart_key = 'shopping-cart-vts-service';
		constructor() {
			this.addProductToCartHandler = null;
			this.shopping_cart_data = [];
			this.products_quantity_element = document.querySelector('.hm-minicart .cart-item-count');
			this.products_sum_element = document.querySelector('.hm-minicart .cart-sum');
			this.cart_products_list = document.querySelector('.hm-minicart .minicart-product-list');
			this.cart_total_element = document.querySelector('.hm-minicart .minicart-total .sum');
			this.products_counter = null;
			this.getShoppingCartData();
			this.updateProductsCounterAndSum();
			this.updateAddToCartBtns();
			this.renderProductsList();
			this.initBindListeners();
			this.initUnbindListeners();
		}
		renderProductsList() {
			const products = this.shopping_cart_data.reduce((result, { title, price, qty, img_url, link }) => {
				return result += `<li class="product-cart-info">
					<a href="${link}" class="minicart-product-image"><img src="${img_url}" alt="${title}"></a>
					<div class="minicart-product-details">
						<h6><a href="${link}">${title}</a></h6>
						<span>${price} грн. x ${qty}</span>
					</div>
					<button data-product-title="${title}" class="close">
						<i data-product-title="${title}" class="fa fa-close"></i>
					</button>
			</li>`

			}, '');
			this.cart_products_list.innerHTML = products;
		}
		updateAddToCartBtn(product_title) {
			const add_to_cart_btn = document.querySelector(`.tab-pane.active [data-product-title="${product_title}"] .add-product-to-cart`);
			const shopping_cart_btn = document.querySelector(`.tab-pane.active [data-product-title="${product_title}"] .go-to-cart-btn`);

			if (add_to_cart_btn) {
				this.unbindAddProductToCartListener(add_to_cart_btn);
				add_to_cart_btn.parentElement.innerHTML = `<a href="/shopping-cart" class="go-to-cart-btn text-success">
				<i class="fa fa-check" aria-hidden="true"></i> &nbsp;<i class="fa fa-shopping-cart" aria-hidden="true"></i>
				</a>`;
			} else if (shopping_cart_btn) {
				const add_product_btn = document.createElement('div');
				add_product_btn.className = 'add-product-to-cart';
				add_product_btn.textContent = 'Купити';

				shopping_cart_btn.parentElement.append(add_product_btn);
				shopping_cart_btn.remove();
				this.addSingleProductToCart(add_product_btn);
			}
		}
		updateAddToCartBtns() {
			this.shopping_cart_data.forEach(({ title }) => {
				this.updateAddToCartBtn(title);
			});
		}
		updateProductsCounterAndSum() {
			this.products_counter = this.shopping_cart_data.reduce((result, { qty, price }) => ({
				qty: result.qty + Number(qty),
				sum: Math.round(((result.sum + Number(price.replace(/,/g, '')) * Number(qty)) + Number.EPSILON) * 100) / 100
			}), { qty: 0, sum: 0 });

			this.products_quantity_element.textContent = this.products_counter.qty;
			this.products_sum_element.textContent = `${numberWithCommas(this.products_counter.sum)} грн.`;
			this.cart_total_element.innerHTML = `${numberWithCommas(this.products_counter.sum)} <span class="text-lowercase">грн.</span>`;
		}
		getShoppingCartData() {
			const cart_data = JSON.parse(localStorage.getItem(ShoppingCart.shopping_cart_key));

			this.shopping_cart_data = cart_data || [];
		}
		setShoppingCartData(data) {
			const stringified_data = JSON.stringify(data);

			// this.shopping_cart_data = data;
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
			this.updateAddToCartBtn(added_product.title);
			this.renderProductsList();
		}
		addSingleProductToCart(element) {
			const product_data = {
				title: element.parentNode.getAttribute('data-product-title'),
				qty: element.parentNode.getAttribute('data-product-qty'),
				price: element.parentNode.getAttribute('data-product-price'),
				link: element.parentNode.getAttribute('data-product-link'),
				img_url: element.parentNode.getAttribute('data-product-img-url')
			};

			this.addProductToCartHandler = this.addProductToCart.bind(this, product_data);
			element.addEventListener('click', this.addProductToCartHandler);
		}
		addToCartBindListeners() {
			const add_to_cart_btns = document.querySelectorAll('.add-product-to-cart');

			add_to_cart_btns.forEach(elm => {
				this.addSingleProductToCart(elm);
			});
		}
		removeCartProduct(event) {
			const { target } = event;
			const product_title = target.getAttribute('data-product-title');

			if (product_title) {
				this.shopping_cart_data = this.shopping_cart_data.filter(({ title }) => title !== product_title);
				this.setShoppingCartData(this.shopping_cart_data);
				this.renderProductsList();
				this.updateProductsCounterAndSum();
				this.updateAddToCartBtn(product_title);
			}
		}
		initBindListeners() {
			document.addEventListener('add_to_cart_btns_listeners', this.addToCartBindListeners.bind(this));
			document.addEventListener('update_add_to_cart_btns', this.updateAddToCartBtns.bind(this));
			this.cart_products_list.addEventListener('click', this.removeCartProduct.bind(this));
		}
		unbindAddProductToCartListener(elm) {
			elm.removeEventListener('click', this.addProductToCartHandler);
		}
		addToCartUnbindListeners() {
			const add_to_cart_btns = document.querySelectorAll('.add-product-to-cart');

			add_to_cart_btns.forEach(elm => {
				this.unbindAddProductToCartListener(elm);
			});
		}
		initUnbindListeners() {
			document.addEventListener('add_to_cart_btns_remove_listeners', this.addToCartUnbindListeners.bind(this));
		}
	}

	window.shopping_cart = new ShoppingCart();
})(jQuery)