(function() {
	'use strict';

	class Checkout {
		constructor() {
			this.checkout_form = document.querySelector('#checkout-form');
			this.email_field = this.checkout_form.querySelector('[type="email"]');
			this.submit_btn = this.checkout_form.querySelector('[type="submit"]');
			this.required_fields = this.checkout_form.querySelectorAll('input[required]');
			this.shipping_address_field = this.checkout_form.querySelector('#shipping-address');
			this.shipping_address_error_msg = this.checkout_form.querySelector('.shipping-address-error-msg');
			this.nova_post_city_field = this.checkout_form.querySelector('#nova-post-city');
			this.nova_post_office_select = this.checkout_form.querySelector('#nova-post-office');
			this.checkout_url = '/checkout';
			this.nova_post_url = 'https://api.novaposhta.ua/v2.0/json/';

			this.bindListeners();
		}
		isFilledElement(element) {
			const filled = element.value.trim();

			element.nextElementSibling.textContent = !filled ? 'Поле обов\'язкове для вводу' : '';

			return filled;
		}
		validate(event) {
			event.preventDefault();
			const required_fields_filled = [].reduce.call(this.required_fields, (result, elem) => {
				const filled = this.isFilledElement(elem);

				return result && filled;
			}, true);
			const valid_shipping_address = this.is_valid_shipping_address();
			const all_fields_valid = valid_shipping_address && this.is_valid_email(this.email_field.value) && required_fields_filled;
			
			return all_fields_valid;
		}
		is_valid_shipping_address = () => {
			const filled_address = this.shipping_address_field.value.trim();
			this.shipping_address_error_msg.textContent = filled_address
			? '' : 'Будь ласка, введіть адресу доставки';

			return filled_address;
		}
		is_valid_email = (email) => {
			const valid = String(email)
				.toLowerCase()
				.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
			this.email_field.nextElementSibling.textContent = !valid && email ? 'Будь ласка, введіть валідний емейл' : '';
			return valid;

		}
		bindListeners() {
			this.submit_btn.addEventListener('click', this.submit.bind(this));
			this.checkout_form.addEventListener('submit', this.submit.bind(this));
			this.required_fields.forEach(elem => {
				elem.addEventListener('keyup', this.isFilledElement.bind(null, elem));
			});
			// this.email_field.addEventListener('key')
			this.nova_post_city_field.addEventListener('keyup', window.debounce(this.searchCityNovaPost.bind(this), 800))
		}
		searchCityNovaPost(event) {
			const { target: { value } } = event;

			if (value.trim()) {
				fetch(this.nova_post_url, {
					method: 'POST',
					headers: {
						'Accept': '/',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						apiKey: '60635140d18ae9c0354f3158bc6c77bb',
						modelName: 'Address',
						calledMethod: 'searchSettlements',
						methodProperties: {
							CityName : value,
							Page : '1',
							Limit : '50'
						}
					})
				}).then(res => res.json())
				.then(res => console.log(res));
			}
		}
		submit(event) {
			event.preventDefault();
			const is_valid = this.validate(event);

			if (is_valid) {
				
			}
		}
	}

	const checkout_page = new Checkout();
})();