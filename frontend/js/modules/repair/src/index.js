import { IconsLoader } from '@utils/icons-loader.js';
import '@modules/shopping-cart/src';
import '@modules/products-search/src';
import { slideToggle } from '@utils/slide-toggle.js';
import {
    is_valid_phone_number,
    isFilledElement,
    setPhoneNumberCode,
    validateRequiredFields
} from '@utils/utils.js';
import { mmenu } from '@utils/mean-menu.js';
import { scrollUp } from '@utils/scroll-up.js';
import { initFontAwesomeCommonIcons } from '@utils/fa-icons.js';
import { AOSX } from 'aosx';
import 'aosx/src/css/animation.css'; 
require('@styles/css/common.css');
require('@styles/modules/repair/repair.scss');

class Repair extends IconsLoader {
    constructor() {
        super();

        this.repair_form = document.querySelector('#repair-service-form');
        this.phone_field = this.repair_form.querySelector('#id_phone_number');
		this.phone_number_code = this.repair_form.querySelector('.number-code');
        this.required_fields = this.repair_form.querySelectorAll('input[required]');
		this.shipping_address_field = this.repair_form.querySelector('#id_shipping_address');
		this.shipping_address_error_msg = this.repair_form.querySelector('.shipping-address-error-msg');
        this.problem_description_field = this.repair_form.querySelector('#id_problem_description');
        this.model_name_field = this.repair_form.querySelector('#id_model_name');
		this.submit_btn = this.repair_form.querySelector('[type="submit"]');
		this.csrfmiddlewaretoken_field = this.repair_form.querySelector('[name="csrfmiddlewaretoken"]');
        this.repair_url = '/repair';

		this.bindListeners();
		initFontAwesomeCommonIcons();
        slideToggle({
			selector: '.hm-minicart-trigger',
			target_container_selector: '.toggle-container'
		});
       const aosx = new AOSX({
            duration: 1200,
            // easing: 'ease-in-out-back'
        });
        aosx.init();
		scrollUp('#scrollUp');
        mmenu();

        setPhoneNumberCode.call(this);
    }

    submit(event) {
		// event.preventDefault();
		const is_valid = this.validate(event);
		const required_fields = [].reduce.call(this.required_fields, (result, {name, value}) => {
			return result = {...result, [name]: value};
		}, {});
		const spinner = this.submit_btn.querySelector('.spinner-border');

		if (is_valid) {
			spinner.classList.remove('d-none');
			fetch(this.repair_url, {
				method: 'POST',
				headers: {
					'Accept': '/',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					shipping_address: this.shipping_address_field.value,
					csrfmiddlewaretoken: this.csrfmiddlewaretoken_field.value,
                    problem_description: this.problem_description_field.value,
                    model_name: this.model_name_field.value,
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

    validate(event) {
		event.preventDefault();
		const required_fields_not_filled = [].filter.call(this.required_fields, field => {
			return !isFilledElement(field);
		});
		const required_fields_filled = [].every.call(this.required_fields, elem => isFilledElement(elem));
		const valid_phone = is_valid_phone_number.call(this, this.phone_field.value);
		const all_fields_valid =  valid_phone && required_fields_filled;
		
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

    bindListeners() {
		this.submit_btn.addEventListener('click', this.submit.bind(this));
		this.repair_form.addEventListener('submit', this.submit.bind(this));
		this.required_fields.forEach(elem => {
			['keyup', 'touchend'].forEach(event_key => {
				elem.addEventListener(event_key, event => {
					if (event.key === 'Tab') {
						return;
					}

					validateRequiredFields.call(this, elem, event);
				})
			});
		});
    }
};

const repair_page = new Repair();
