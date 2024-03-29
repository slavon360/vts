import * as Sqrl from 'squirrelly';
import ordered_products from '@templates/ordered-products.html';
import {
	debounce,
	numberWithCommas,
	is_valid_phone_number,
	validateRequiredFields,
	isFilledElement,
	setPhoneNumberCode
} from '@utils/utils.js';
import { IconsLoader } from '@utils/icons-loader.js';
import '@modules/shopping-cart/src';
import '@modules/products-search/src';
import { slideToggle } from '@utils/slide-toggle.js';
import { mmenu } from '@utils/mean-menu.js';
import { scrollUp } from '@utils/scroll-up.js';
import { initFontAwesomeCommonIcons } from '@utils/fa-icons.js';
require('@styles/css/common.css');
require('@root/styles/modules/checkout/checkout.scss');

class Checkout extends IconsLoader {
	constructor() {
		super();
		this.shopping_cart_key = 'shopping-cart-vts-service';
		this.checkout_form = document.querySelector('#checkout-form');
		this.phone_field = this.checkout_form.querySelector('#id_phone_number');
		this.phone_number_code = this.checkout_form.querySelector('.number-code');
		this.email_field = this.checkout_form.querySelector('[type="email"]');
		this.submit_btn = this.checkout_form.querySelector('[type="submit"]');
		this.required_fields = this.checkout_form.querySelectorAll('input[required]');
		// this.input_fields = document.querySelectorAll('form input');
		this.shipping_address_field = this.checkout_form.querySelector('#shipping-address');
		this.shipping_address_error_msg = this.checkout_form.querySelector('.shipping-address-error-msg');
		this.nova_post_city_field = this.checkout_form.querySelector('#nova-post-city');
		this.csrfmiddlewaretoken_field = this.checkout_form.querySelector('[name="csrfmiddlewaretoken"]');
		this.nova_post_office_select = this.checkout_form.querySelector('#nova-post-office');
		this.checkout_url = '/checkout';
		this.nova_post_settlements_url = '/external/nova-poshta/search-settlements/api';
		this.nova_post_warehouses_url = '/external/nova-poshta/search-warehouses/api';

		setPhoneNumberCode.call(this);
		this.bindListeners();
		initFontAwesomeCommonIcons();
		slideToggle({
			selector: '.hm-minicart-trigger',
			target_container_selector: '.toggle-container'
		});
		scrollUp('#scrollUp');
        mmenu();

		// this.input_fields.forEach(input => input.setAttribute('autocomplete', 'false'));
	}
	getShoppingCartData() {
		const cart_data = JSON.parse(localStorage.getItem(this.shopping_cart_key));
		const total = cart_data.reduce((result, {price}) => result += Number(price.replace(/,/g, '')), 0);
		const result = Sqrl.render(ordered_products, { cart_data, total: numberWithCommas(total) });

		return result;
	}
	validate(event) {
		event.preventDefault();
		const required_fields_not_filled = [].filter.call(this.required_fields, field => {
			return !isFilledElement(field);
		});
		const required_fields_filled = [].every.call(this.required_fields, elem => isFilledElement(elem));
		const valid_shipping_address = this.validateShippingAddress();
		const valid_phone = is_valid_phone_number.call(this, this.phone_field.value);
		const valid_email = this.is_valid_email(this.email_field.value);
		const all_fields_valid = valid_shipping_address && valid_phone && required_fields_filled;
		
		if (required_fields_not_filled && required_fields_not_filled.length) {
			const [ first_field ] = required_fields_not_filled;
			const first_field_top_position = first_field.parentElement.getBoundingClientRect().top;
			const { scrollY } = window;

			window.scroll({
				top: first_field_top_position < 0 ? scrollY + first_field_top_position : first_field_top_position,
				behavior: 'smooth'
			});
		}

		return all_fields_valid;
	}
	validateShippingAddress = () => {
		const filled_address = this.shipping_address_field.value.trim();
		this.shipping_address_error_msg.textContent = filled_address
		? '' : 'Будь ласка, введіть адресу доставки';

		return filled_address;
	}
	is_valid_email = email => {
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
			['keyup', 'touchend'].forEach(event_key => {
				elem.addEventListener(event_key, event => {

					if (event.key === 'Tab') {
						return;
					}

					validateRequiredFields.call(this, elem, event);
				});
			});
		});
		this.nova_post_city_field.addEventListener('keyup', debounce(this.searchCityNovaPost.bind(this), 800));
		this.checkout_form.addEventListener('click', this.hideSearchedResults.bind(this));
		this.nova_post_city_field.addEventListener('click', this.showSearchedResults);
		this.nova_post_office_select.addEventListener('change', this.setNovaPostShippingAddress.bind(this));
	}
	showPreloader(active_field) {
		active_field.setAttribute('disabled', true);
		active_field.nextElementSibling.classList.remove('d-none');
	}
	hidePreloader(active_field) {
		active_field.removeAttribute('disabled');
		active_field.nextElementSibling.classList.add('d-none');
	}
	showDeliveryCompanyError(error_element, errors) {
		const not_found_msg = 'Місто не знайдено. Перевірте правильність написання.';
		const err = errors.reduce((result, current) => result += current, '');
		console.error(err);
		error_element.textContent = not_found_msg;
	}
	hideDeliveryCompanyError(error_element) {
		error_element.textContent = '';
	}
	hideSearchedResults() {
		const results_containers = this.checkout_form.querySelectorAll('.searched-results');

		results_containers.forEach(container => container.classList.add('d-none'));
	}
	showSearchedResults(event) {
		event.stopPropagation();
		const { target } = event;
		const results_container = target.parentElement.querySelector('.searched-results');

		results_container.classList.remove('d-none');
	}
	renderCities({
		results_container,
		addresses,
		search_query,
		data_target_select_id
	}) {
		const results = addresses.map(({Present, MainDescription}) => {
			const query = new RegExp(search_query, 'ig');
			const title_content = Present.replace(query, `<b>${search_query}</b>`).toLowerCase();
			return `<div class="searched-city" data-city-name="${MainDescription}" data-target-select-id="${data_target_select_id}">${title_content}</div>`;
		}).join('');
		results_container.innerHTML = results;
		results_container.classList.remove('d-none');
		results_container.querySelectorAll('.searched-city')
			.forEach(elem => {
				elem.addEventListener('click', this.bindCityClickHandler.bind(this));
			});
	}
	bindCityClickHandler(event) {
		const { target } = event;
		const city_name = target.getAttribute('data-city-name');
		const target_select_id = target.getAttribute('data-target-select-id');
		const city_and_region_name = target.textContent;

		switch (target_select_id) {
			case 'nova-post-office':
				this.searchWarehousesNovaPost({city_name, target_select_id, city_and_region_name});
				break;
		
			default:
				break;
		}
	}
	setNovaPostShippingAddress(event) {
		const city_and_region_name = this.nova_post_city_field.value;
		const warehouse_address = event.target.value;

		this.shipping_address_field.value = `${city_and_region_name} ${warehouse_address}`;
		this.validateShippingAddress();
	}
	searchWarehousesNovaPost({city_name, target_select_id, city_and_region_name}) {
		const select_tag_element = this.checkout_form.querySelector(`#${target_select_id}`);
		const parent_element = select_tag_element.parentElement;
		select_tag_element.innerHTML = '';
		this.showPreloader(select_tag_element);
		this.nova_post_city_field.value = city_and_region_name;

		this.hideSearchedResults();
		fetch(this.nova_post_warehouses_url, {
			method: 'POST',
			headers: {
				'Accept': '/',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				csrfmiddlewaretoken: this.csrfmiddlewaretoken_field.value,
				CityName : city_name,
				Page : '1',
				Limit : '500'
			})
		}).then(res => res.json())
		.then(({ errors, data, success }) => {
			const error_element = parent_element.querySelector('.text-danger');

			if (!success) {
				this.showDeliveryCompanyError(error_element, errors);
			} else {
				select_tag_element.add(new Option('', ''));
				data.forEach(({ Description, Schedule, WarehouseIndex }) => {
					select_tag_element.add(new Option(Description, Description));
				});
			}
		})
		.finally(() => {
			this.hidePreloader(select_tag_element);
		});
	}
	unbindSearchedResultsClickHandlersAndRemove() {
		const cities_elements = this.checkout_form.querySelectorAll('.searched-results .searched-city');

		cities_elements.forEach(elem => {
			elem.removeEventListener('click', this.bindCityClickHandler);
			elem.remove();
		})

	}
	searchCityNovaPost(event) {
		const { target: { value } } = event;
		const data_target_select_id = event.target.getAttribute('data-target-select-id');

		if (value.trim()) {
			this.showPreloader(event.target);
			this.unbindSearchedResultsClickHandlersAndRemove();
			fetch(this.nova_post_settlements_url, {
				method: 'POST',
				headers: {
					'Accept': '/',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					csrfmiddlewaretoken: this.csrfmiddlewaretoken_field.value,
					CityName : value,
					Page : '1',
					Limit : '50'
				})
			}).then(res => res.json())
			.then(({ errors, data, success }) => {
				const [{ TotalCount, Addresses } = {}] = data;
				const container = event.target.parentElement;
				const error_element = container.querySelector('.text-danger');

				if (!success || TotalCount === 0) {
					this.showDeliveryCompanyError(error_element, errors);
				} else {
					const results_container = container.querySelector('.searched-results');
					const addresses = Addresses.map(({Present, MainDescription}) => ({Present, MainDescription}));
					this.hideDeliveryCompanyError(error_element);
					this.renderCities({
						results_container,
						addresses,
						search_query: value,
						data_target_select_id
					});
				}
			})
			.finally(() => {
				this.hidePreloader(event.target);
				event.target.focus();
			});
		}
	}
	submit(event) {
		// event.preventDefault();
		console.log('submit');
		const is_valid = this.validate(event);
		const required_fields = [].reduce.call(this.required_fields, (result, {name, value}) => {
			return result = {...result, [name]: value};
		}, {});
		const spinner = this.submit_btn.querySelector('.spinner-border');

		if (is_valid) {
			spinner.classList.remove('d-none');
			fetch(this.checkout_url, {
				method: 'POST',
				headers: {
					'Accept': '/',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					shipping_address: this.shipping_address_field.value,
					email: this.email_field.value,
					details: this.getShoppingCartData(),
					csrfmiddlewaretoken: this.csrfmiddlewaretoken_field.value,
					...required_fields
				})
			})
			.then(({redirected, status, url}) => {
				if (status === 200 && redirected) {
					location.href = url;
				}
			})
			.finally(() => {
				spinner.classList.add('d-none');
			});
		}
	}
}

const checkout_page = new Checkout();
