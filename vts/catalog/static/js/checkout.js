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
			this.nova_post_city_field.addEventListener('keyup', window.debounce(this.searchCityNovaPost.bind(this), 800));
			this.checkout_form.addEventListener('click', this.hideSearchedResults.bind(this));
			this.nova_post_city_field.addEventListener('click', this.showSearchedResults);
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

			switch (target_select_id) {
				case 'nova-post-office':
					this.searchWarehousesNovaPost({city_name, target_select_id});
					break;
			
				default:
					break;
			}
		}
		searchWarehousesNovaPost({city_name, target_select_id}) {
			const select_tag_element = this.checkout_form.querySelector(`#${target_select_id}`);
			const parent_element = select_tag_element.parentElement;
			this.showPreloader(select_tag_element);
			this.nova_post_city_field.value = city_name;

			this.hideSearchedResults();
			fetch(this.nova_post_url, {
				method: 'POST',
				headers: {
					'Accept': '/',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					apiKey: '60635140d18ae9c0354f3158bc6c77bb',
					modelName: 'Address',
					calledMethod: 'getWarehouses',
					methodProperties: {
						CityName : city_name,
						Page : '1',
						Limit : '50'
					}
				})
			}).then(res => res.json())
			.then(({ errors, data, success }) => {
				const error_element = parent_element.querySelector('.text-danger');

				if (!success) {
					this.showDeliveryCompanyError(error_element, errors);
				} else {
					data.forEach(({ Description, Schedule, WarehouseIndex }) => {
						select_tag_element.add(new Option(Description, WarehouseIndex));
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
			event.preventDefault();
			const is_valid = this.validate(event);

			if (is_valid) {
				
			}
		}
	}

	const checkout_page = new Checkout();
})();