
export function debounce(func, timeout = 300){
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export class ProductQtyInput {
	constructor () {
		this.product_qty_input = document.querySelector('.cart-plus-minus-box');
        this.add_to_cart_container = document.querySelector('.add-to-cart-container');
		this.bindEventListeners();
	}

	changeProductQuantity(event) {
        const { target: { value } } = event;

        this.add_to_cart_container.setAttribute('data-product-qty', value > 0 ? value : 1);
    }
    bindEventListeners() {
        this.product_qty_input.addEventListener('keyup', this.changeProductQuantity.bind(this));
    }
}