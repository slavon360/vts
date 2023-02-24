import { render } from 'squirrelly';
import { numberWithCommas } from '../../../utils/utils.js';
import shopping_cart_products_template from '../../../../../templates/catalog/shopping-cart/products.html';
import shopping_cart_product_list_template from '../../../../../templates/catalog/shopping-cart/products-list.html';

const squirellyRender = render;

class ShoppingCart {
	static shopping_cart_key = 'shopping-cart-vts-service';
	constructor() {
		this.addToCartBindListenersHandler = null;
		this.updateAddToCartBtnsHandler = null;
		this.updateSingleAddProductAreaHandler = null;
		this.addProductToCartHandler = null;
		this.shopping_cart_data = [];
		this.products_quantity_element = document.querySelector('.hm-minicart .cart-item-count');
		this.products_sum_element = document.querySelector('.hm-minicart .cart-sum');
		this.cart_products_list = document.querySelector('.hm-minicart .minicart-product-list');
		this.cart_total_element = document.querySelector('.hm-minicart .minicart-total .sum');
		this.shopping_cart_tbody_element = document.querySelector('.Shopping-cart-area .shopping-cart-tbody');
		this.shopping_cart_page_sum = document.querySelector('.Shopping-cart-area .sum');
		this.qty_btns = [];
		this.products_counter = null;
		this.getShoppingCartData();
		this.updateProductsCounterAndSum();
		this.updateAddToCartBtns();
		this.renderProductsList();
		this.initShoppingCartTableHandler();
		this.initBindListeners();
		this.initUnbindListeners();
	}
	getProductTotal(price, qty) {
		return Number(price.replace(/,/g, '')) * Number(qty);
	}
	removeProductFromShoppingCartTable(product_id) {
		if (location.pathname.includes('shopping-cart')) {
			const tr_product = this.shopping_cart_tbody_element.querySelector(`[id="${product_id}"]`);

			if (tr_product) {
				tr_product.closest('tr').remove();
				this.updateShoppingCartPageSum();
			}
		}
	}
	initShoppingCartTableHandler() {
		if (location.pathname.includes('shopping-cart')) {
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
		this.qty_btns = this.shopping_cart_tbody_element.querySelectorAll('.qtybutton');
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
		this.shopping_cart_data.forEach(({ id }) => {
			this.updateAddToCartBtn(id);
		});
	}
	updateProductsCounterAndSum() {
		this.products_counter = this.shopping_cart_data.reduce((result, { qty, price }) => ({
			qty: result.qty + Number(qty),
			sum: Math.round(((result.sum + this.getProductTotal(price, qty)) + Number.EPSILON) * 100) / 100
		}), { qty: 0, sum: 0 });

		this.products_quantity_element.textContent = this.products_counter.qty || '';
		this.products_sum_element.textContent = `${numberWithCommas(this.products_counter.sum) || ''} грн.`;
		this.cart_total_element.innerHTML = `${numberWithCommas(this.products_counter.sum)} <span class="text-lowercase">грн.</span>`;
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
		this.qty_btns.forEach(qty_btn => {
			qty_btn.addEventListener('click', this.increaseDecreaseProductQty.bind(this));
		});
	}
	unbindAddProductToCartListener(elm) {
		elm.removeEventListener('click', this.addProductToCartHandler);
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
			--current_qty;
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