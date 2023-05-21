const COUNTRY_CODE = '+38';
export function debounce(func, timeout = 300){
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

export function phoneNumberFormatHandler(elem, event) {
	if (elem.id === this.phone_field.id) {
		if (!event.key.match(/^\d+$/)) {
			this.phone_field.value = this.phone_field.value.replaceAll(event.key, '');
			return;
		}
		if (elem.value.length > 14) {
			this.phone_field.value = elem.value.slice(0, 14);
			return;
		}
		switch (elem.value.length) {
			case 3:
				this.phone_field.value = `(${elem.value})`;
				break;
			case 8:
				this.phone_field.value = `${elem.value.slice(0,5)} ${elem.value.slice(5)}`;
			case 10:
				this.phone_field.value = `${elem.value.slice(0,9)} ${elem.value.slice(9)}`;
			default:
				break;
		}
	}
}

export function is_valid_phone_number(phone){
	const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;
	const valid = phone.match(regex);
	this.phone_field.nextElementSibling.textContent = valid ? '' : 'Будь ласка, введіть валідний номер';
	this.phone_field.parentElement.style.marginBottom = valid ? '' : '25px';
	return valid;
}

export function isFilledElement(element) {
	const filled = element.value.trim();

	element.nextElementSibling.textContent = !filled ? 'Поле обов\'язкове для вводу' : '';

	return filled;
}

export function setPhoneNumberCode() {
	this.phone_number_code.textContent = COUNTRY_CODE;
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
		if (this.product_qty_input) {
			this.product_qty_input.addEventListener('keyup', this.changeProductQuantity.bind(this));
		}
    }
}