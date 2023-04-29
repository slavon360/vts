import { render } from 'squirrelly';
import shopping_cart_products_template from '@backend/catalog/templates/catalog/shopping-cart/products.html';
import shopping_cart_product_list_template from '@backend/catalog/templates/catalog/shopping-cart/products-list.html';
import '@modules/products-search/src';
import { slideToggle } from '@utils/slide-toggle.js';
import { numberWithCommas } from '@utils/utils.js';
import { scrollUp } from '@utils/scroll-up.js';
require('@styles/css/common.css');

const squirellyRender = render;

class ShoppingCart {
	static shopping_cart_key = 'shopping-cart-vts-service';
	constructor() {
		this.single_product_page = document.querySelectorAll('.single-product-area');
		this.addToCartBindListenersHandler = null;
		this.updateAddToCartBtnsHandler = null;
		this.updateSingleAddProductAreaHandler = null;
		this.addProductToCartHandler = null;
		this.shopping_cart_data = [];
		this.hm_minicart = document.querySelector('.hm-minicart');
		this.products_quantity_element = this.hm_minicart.querySelector('.cart-item-count');
		this.products_sum_element = this.hm_minicart.querySelector('.cart-sum');
		this.cart_products_list = this.hm_minicart.querySelector('.minicart-product-list');
		this.cart_total_element = this.hm_minicart.querySelector('.minicart-total .sum');
		this.shopping_cart_tbody_element = document.querySelector('.Shopping-cart-area .shopping-cart-tbody');
		this.shopping_cart_page_sum = document.querySelector('.Shopping-cart-area .sum');
		this.minicart_buttons = this.hm_minicart.querySelectorAll('.minicart-button .btn');
		this.shopping_cart_qty_btns = [];
		this.add_to_cart_qty_btns = document.querySelectorAll('.single-add-to-cart .qtybutton');
		this.products_counter = null;
		this.getShoppingCartData();
		this.updateProductsCounterAndSum();
		this.updateAddToCartBtns();
		this.renderProductsList();
		this.initShoppingCartTableHandler();
		this.initBindListeners();
		this.initUnbindListeners();
		if (this.isShoppingCartPage) {
			slideToggle({
				selector: '.hm-minicart-trigger',
				target_container_selector: '.toggle-container'
			});
		}
		scrollUp('#scrollUp');
		this.initializeMeanMenu();
	}
	get isShoppingCartPage() {
		return location.pathname.includes('shopping-cart');
	}
	async initializeMeanMenu() {
		console.log('this.isShoppingCartPage: ', this.isShoppingCartPage);
		if (this.isShoppingCartPage) {
			const { mmenu } = await import('@utils/mean-menu.js');
			console.log(mmenu);
			mmenu();
		}
	}
	getProductTotal(price, qty) {
		return Number(price.replace(/,/g, '')) * Number(qty);
	}
	removeProductFromShoppingCartTable(product_id) {
		if (this.isShoppingCartPage) {
			const tr_product = this.shopping_cart_tbody_element.querySelector(`[id="${product_id}"]`);

			if (tr_product) {
				tr_product.closest('tr').remove();
				this.updateShoppingCartPageSum();
			}
		}
	}
	initShoppingCartTableHandler() {
		if (this.isShoppingCartPage) {
			this.renderShoppingCartTable();
		}
	}
	renderShoppingCartTable() {
		const products = this.shopping_cart_data.map(product_data => ({
			...product_data,
			amount: numberWithCommas(this.getProductTotal(product_data.price, product_data.qty).toFixed(2))
		}));
		const table_data = squirellyRender(shopping_cart_products_template, { products });

		this.shopping_cart_tbody_element.innerHTML = table_data;
		this.shopping_cart_qty_btns = this.shopping_cart_tbody_element.querySelectorAll('.qtybutton');
		this.updateShoppingCartPageSum();
	}
	updateShoppingCartPageSum() {
		this.shopping_cart_page_sum.textContent = `${numberWithCommas(this.products_counter.sum)} грн.`;
	}
	renderProductsList() {
		const table_data = squirellyRender(shopping_cart_product_list_template, { products: this.shopping_cart_data });
		this.cart_products_list.innerHTML = table_data;
	}
	updateSingleAddProductArea(event) {
		const { detail: { product_id }} = event;
		const single_add_to_cart = document.querySelector('.single-add-to-cart');
		const add_to_cart_prod_id = single_add_to_cart.querySelector(`[data-product-id="${product_id}"]`);
		const exist = this.shopping_cart_data.find(({ id }) => id === product_id);

		if (add_to_cart_prod_id) {
			single_add_to_cart.querySelector('.cart-quantity').classList[exist ? 'add' : 'remove']('d-none');
			single_add_to_cart.querySelector('.alert-success').classList[exist ? 'remove' : 'add']('d-none');
		}
	}
	updateAddToCartBtn(product_id) {
		const add_to_cart_btns = document.querySelectorAll(`[data-product-id="${product_id}"] .add-product-to-cart:not([from-modal="true"])`);
		const shopping_cart_btns = document.querySelectorAll(`[data-product-id="${product_id}"] .go-to-cart-btn`);

		if (this.single_product_page.length) {
			this.updateSingleAddProductArea({ detail: { product_id } });
			return;
		}

		if (add_to_cart_btns.length) {
			add_to_cart_btns.forEach(add_to_cart_btn => {
				this.unbindAddProductToCartListener(add_to_cart_btn);
				add_to_cart_btn.parentElement.innerHTML = `<a href="/shopping-cart" class="go-to-cart-btn text-success">
				<i class="fa fa-check" aria-hidden="true"></i> &nbsp;<i class="fa fa-shopping-cart" aria-hidden="true"></i>
				</a>`;
			});
		} else if (shopping_cart_btns.length) {
			shopping_cart_btns.forEach(shopping_cart_btn => {
				const add_product_btn = document.createElement('div');
				add_product_btn.className = 'add-product-to-cart';
				add_product_btn.textContent = 'Купити';

				shopping_cart_btn.parentElement.append(add_product_btn);
				shopping_cart_btn.remove();
				this.addSingleProductToCartAddEventListener(add_product_btn);
			});
		}
	}
	updateAddToCartBtns() {
		if (!this.single_product_page.length) {
			this.shopping_cart_data.forEach(({ id }) => {
				this.updateAddToCartBtn(id);
			});
		}
	}
	updateProductsCounterAndSum() {
		this.products_counter = this.shopping_cart_data.reduce((result, { qty, price }) => ({
			qty: result.qty + Number(qty),
			sum: Math.round(((result.sum + this.getProductTotal(price, qty)) + Number.EPSILON) * 100) / 100
		}), { qty: 0, sum: 0 });

		const products_sum = numberWithCommas(this.products_counter.sum);

		this.products_quantity_element.textContent = this.products_counter.qty || '';
		this.products_sum_element.textContent = this.products_counter.sum > 0 ? `${products_sum} грн.` : '';
		this.cart_total_element.innerHTML = `${numberWithCommas(this.products_counter.sum)} <span class="text-lowercase">грн.</span>`;
		this.conditionallyDisableMinicartButtons();
	}
	conditionallyDisableMinicartButtons() {
		if (this.products_counter.qty <= 0) {
			this.minicart_buttons.forEach(btn => {
				btn.classList.add('disabled');
			});
		} else {
			this.minicart_buttons.forEach(btn => {
				btn.classList.remove('disabled');
			});
		}
	}
	getShoppingCartData() {
		const cart_data = JSON.parse(localStorage.getItem(ShoppingCart.shopping_cart_key));

		this.shopping_cart_data = cart_data || [];
	}
	setShoppingCartData(data) {
		const stringified_data = JSON.stringify(data);

		localStorage.setItem(ShoppingCart.shopping_cart_key, stringified_data);
	}
	addProductToCart(element) {
		const is_from_modal = element.getAttribute('from-modal');
		const added_product = {
			id: element.parentNode.getAttribute('data-product-id'),
			title: element.parentNode.getAttribute('data-product-title'),
			qty: element.parentNode.getAttribute('data-product-qty'),
			price: element.parentNode.getAttribute('data-product-price'),
			link: element.parentNode.getAttribute('data-product-link'),
			img_url: element.parentNode.getAttribute('data-product-img-url')
		};
		const existed_product = this.shopping_cart_data.find(({id}) => id === added_product.id);
		const product = existed_product ? { ...existed_product, qty: ++existed_product.qty } : added_product;

		this.shopping_cart_data = [
			...this.shopping_cart_data.filter(({id}) => id !== product.id),
			product
		];
		this.setShoppingCartData(this.shopping_cart_data);
		this.updateProductsCounterAndSum();
		this.renderProductsList();

		if (is_from_modal) {
			this.updateSingleAddProductArea({ detail: { product_id: added_product.id } });
		}
		this.updateAddToCartBtn(added_product.id);
	}
	addSingleProductToCartAddEventListener(element) {
		this.addProductToCartHandler = this.addProductToCart.bind(this, element);
		element.addEventListener('click', this.addProductToCartHandler);
	}
	addToCartBindListeners() {
		const add_to_cart_btns = document.querySelectorAll('.add-product-to-cart');

		add_to_cart_btns.forEach(elm => {
			this.addSingleProductToCartAddEventListener(elm);
		});
	}
	removeCartProduct(event) {
		const { target } = event;
		const product_id = target.getAttribute('data-product-id');

		if (!target.href && !target.parentElement.href) event.preventDefault();

		if (product_id) {
			this.shopping_cart_data = this.shopping_cart_data.filter(({ id }) => id !== product_id);
			this.setShoppingCartData(this.shopping_cart_data);
			this.renderProductsList();
			this.updateProductsCounterAndSum();
			this.updateAddToCartBtn(product_id);
			this.removeProductFromShoppingCartTable(product_id);
		}
	}
	initBindListeners() {
		this.addToCartBindListenersHandler = this.addToCartBindListeners.bind(this);
		this.updateAddToCartBtnsHandler = this.updateAddToCartBtns.bind(this);
		this.updateSingleAddProductAreaHandler = this.updateSingleAddProductArea.bind(this);

		document.addEventListener('add_to_cart_btns_listeners', this.addToCartBindListenersHandler);
		document.addEventListener('update_add_to_cart_btns', this.updateAddToCartBtnsHandler);
		document.addEventListener('update_single_add_product_area', this.updateSingleAddProductAreaHandler);
		[this.cart_products_list, this.shopping_cart_tbody_element].forEach(element => {
			if (element) {
				element.addEventListener('click', this.removeCartProduct.bind(this));
			}
		});
		this.shopping_cart_qty_btns.forEach(qty_btn => {
			qty_btn.addEventListener('click', this.increaseDecreaseProductQty.bind(this));
		});
		this.add_to_cart_qty_btns.forEach(btn => {
			btn.addEventListener('click', this.increaseDecreaseSingleProductQty);
		});
	}
	unbindAddProductToCartListener(elm) {
		elm.removeEventListener('click', this.addProductToCartHandler);
	}
	increaseDecreaseSingleProductQty(event) {
		const add_to_cart_container = document.querySelector('.add-to-cart-container');
		const button = event.currentTarget;
		const oldValue = button.parentNode.querySelector('input').value;
		let newVal;
		if (button.classList.contains('inc')) {
			newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 1) {
				newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 1;
			}
		}
		button.parentNode.querySelector('input').value = newVal;
		add_to_cart_container.setAttribute('data-product-qty', newVal);
	}
	increaseDecreaseProductQty(event) {
		event.stopPropagation();
		const { currentTarget: qty_btn } = event;
		const price = qty_btn.getAttribute('data-product-price').replace(/,/gi, '');
		const product_id = qty_btn.getAttribute('data-product-id');
		const amount_el = this.shopping_cart_tbody_element.querySelector(`[id="${product_id}"] .sum`);
		let current_qty = this.shopping_cart_tbody_element.querySelector(`[id="${product_id}"] input`).value;

		if (qty_btn.classList.contains('inc')) {
			++current_qty;
		} else {
			if (current_qty > 1) {
				--current_qty;
			}
		}
		const product_sum = (price * current_qty).toFixed(2);
		this.shopping_cart_tbody_element.querySelector(`[id="${product_id}"] input`).value = current_qty;
		amount_el.textContent = `${numberWithCommas(product_sum)} грн.`;

		this.shopping_cart_data = this.shopping_cart_data.map((product) => ({
			...product,
			qty: product.id === product_id ? current_qty : product.qty
		}));
		this.setShoppingCartData(this.shopping_cart_data);
		this.renderProductsList();
		this.updateProductsCounterAndSum();
		this.updateShoppingCartPageSum();
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