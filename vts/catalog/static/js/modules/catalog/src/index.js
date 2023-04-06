import { render } from 'squirrelly';
import grid_view_template from '../../../../../templates/catalog/products/grid-view.html';
import list_view_template from '../../../../../templates/catalog/products/list-view.html';
import pagination_view_template from '../../../../../templates/catalog/products/pagination.html';
import {
	triggerAddToCartBtnsListeners,
	triggerAddToCartBtnsRemoveListeners,
	triggerUpdateAddToCartBtns
} from '../../../utils/events.js';
import '@modules/shopping-cart/src';
import '@modules/products-search/src';
import { slideToggle } from '@utils/slide-toggle.js';
import { mmenu } from '@utils/mean-menu.js';
import { scrollUp } from '@utils/scroll-up.js';
require('@styles/css/common.css');

const squirellyRender = render;
let current_page = 1;
const sort_products_catalog = document.querySelector('#sort_products_catalog');
const toolbar_amount_active_page = document.querySelector('.toolbar-amount .active-page-nmb');

slideToggle({
	selector: '.hm-minicart-trigger',
	target_container_selector: '.toggle-container'
});
scrollUp('#scrollUp');
mmenu();
const renderPagination = ({ count, next, previous, results}) => {
	function makePagesArray ({current_page, last_page, show_on_both_sides}) {
		const page_link = current_page === last_page ? previous : next;
		let pages_list = Array.from({length: last_page}, (_, i) => i + 1).map(page_n => ({
			page: page_n,
			link: page_link.replace(/(page=)(\d*)/g, `page=${page_n}`),
			active: current_page === page_n
		}));
		const addIntermediatePage = pages => {
			if (last_page - show_on_both_sides > current_page) {
				const int_page = current_page + show_on_both_sides;

				pages[pages.length - 2] = {
					page: '...',
					link: next.replace(/(page=)(\d*)/g, `page=${int_page}`),
					active: false
				}
			}
			if (current_page <= last_page && current_page > (show_on_both_sides + 1)) {
				const int_page = Math.floor((Number(pages_list[show_on_both_sides - 1].page) + current_page) / 2);

				pages[show_on_both_sides - 1] = {
					page: '...',
					link: (next || previous).replace(/(page=)(\d*)/g, `page=${int_page}`),
					active: false
				}
			}
		}
		const conditionallySlicePages = () => {
			if (last_page > show_on_both_sides * 2) {

				let sliced_pages = pages_list.slice(current_page > 1 ? current_page - 1 : 0, current_page + show_on_both_sides);
				sliced_pages[sliced_pages.length - 1] = pages_list[last_page - 1];

				if (current_page > show_on_both_sides) {
					const sliced_from_start = pages_list.slice(0, show_on_both_sides);
					sliced_pages = [...sliced_from_start, ...sliced_pages];
				}

				return sliced_pages;
			}
			return pages_list;
		}

		const sliced_pages_list = conditionallySlicePages();
		addIntermediatePage(sliced_pages_list);

		return sliced_pages_list;
	}
	const pagination_area = document.querySelector('.paginatoin-area');
	const page_num_element = pagination_area.querySelector('.page-number');
	const last_page_number = next ? Math.ceil(count / results.length) : current_page;
	const pages_array = makePagesArray({
		current_page: current_page,
		last_page: last_page_number,
		show_on_both_sides: 3
	});
	const pages_elements = pages_array.map(({page, link, active}) => ({
		number: page,
		link,
		active
	}));
	const pagination_view = squirellyRender(pagination_view_template, {
		pages_elements,
		current_page,
		last_page_number,
		previous_page: previous,
		next_page: next
	});

	if (page_num_element) {
		page_num_element.removeEventListener('click', pageClickHandler);
	}
	pagination_area.innerHTML = pagination_view;
	pagination_area.querySelectorAll('.page-number').forEach(elm => {
		elm.addEventListener('click', pageClickHandler);
	});
};
const renderProductsGrid = (products) => {
	const grid_view_products = document.querySelector('.grid-view-products');

	grid_view_products.innerHTML = '';
	const prod = products.map(({
		id,
		get_absolute_url,
		manufacturer,
		title,
		discount_price,
		get_actual_discount_price,
		get_actual_price,
		first_image,
		images_list,
		description
	}) => ({
		id,
		get_absolute_url,
		manufacturer,
		title,
		discount_price,
		get_actual_discount_price,
		get_actual_price,
		first_image_url: first_image.image_url,
		images_list,
		description: description.replace(/"/gi, '\''),
		discount: get_actual_discount_price ? `data-product-discount-price="${get_actual_discount_price}"` : '',
		images_urls: images_list.reduce((result, {image_url}) => result += image_url, '')
	}));
	const grid_view = squirellyRender(grid_view_template, {products: prod});

	grid_view_products.insertAdjacentHTML('beforeend', grid_view);
};
const renderProductsList = (products) => {
	const list_view_products = document.querySelector('.list-view-products');

	list_view_products.innerHTML = '';
	const prod = products.map(({
		id,
		get_absolute_url,
		manufacturer,
		title,
		discount_price,
		get_actual_discount_price,
		get_actual_price,
		first_image,
		images_list,
		description
	}, index) => ({
		id,
		get_absolute_url,
		manufacturer,
		title,
		discount_price,
		get_actual_discount_price,
		get_actual_price,
		first_image_url: first_image.image_url,
		image_url: images_list[0].image_url,
		description: description.replace(/"/gi, '\''),
		price_block: discount_price 
		? 
		`
		<span class="new-price new-price-2">${get_actual_discount_price} грн.</span>
		<span class="old-price">${get_actual_price} грн.</span>
		`
		: `<span class="new-price">${get_actual_price} грн.</span>`,
		discount: get_actual_discount_price ? `data-product-discount-price="${get_actual_discount_price}"` : '',
		images_urls: images_list.reduce((result, { image_url }) => result += image_url, ''),
		is_last: products.length - 1 === index
	}));
	const list_view = squirellyRender(list_view_template, { products: prod });

	list_view_products.insertAdjacentHTML('beforeend', list_view);
};

function sortProductsHandler() {
	const sort_by = this.value;
	const category_id = this.dataset.category_id;
	const subcategory_id = this.dataset.subcategory_id;
	const subsubcategory_id = this.dataset.subsubcategory_id;
	const queries = [
		category_id ? `&category_id=${category_id}` : null,
		subcategory_id ? `&subcategory_id=${subcategory_id}` : null,
		subsubcategory_id ? `&subsubcategory_id=${subsubcategory_id}` : null
	].filter(Boolean).join('');
	current_page = 1;

	updateQueryStringParams({sort_by, page: current_page});
	toolbar_amount_active_page.textContent = current_page;

	fetch(`/products-catalog/api?sort_by=${sort_by}${queries}`)
		.then(response => response.json())
		.then(data => updateProductsHandler(sort_by, data))
		.catch(error => console.log(error));
}

sort_products_catalog.addEventListener('change', sortProductsHandler);
function updateProductsHandler (sort_by, response) {
	let { results = [], next, previous } = response;

	if (sort_by.includes('price')) {
		const sign = sort_by.includes('ascending') ? 1 : -1;

		results = results.sort((a, b) => parseFloat(a.get_actual_price.replace(/,/g, '')) > parseFloat(b.get_actual_price.replace(/,/g, '')) 
		? sign 
		: sign * -1);
	}

	triggerAddToCartBtnsRemoveListeners();
	renderProductsGrid(results);
	renderProductsList(results);
	triggerAddToCartBtnsListeners();
	triggerUpdateAddToCartBtns();
	if (next || previous) {
		renderPagination(response);
	}
}

function pageClickHandler () {
	const url = this.dataset.link;
	const qs_obj = JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
	const { sort_by, page } = qs_obj;
	current_page = Number(page) || 1;

	toolbar_amount_active_page.textContent = current_page;
	fetch(url)
		.then(response => response.json())
		.then(response => {
			updateProductsHandler(sort_by, response);
			updateQueryStringParams({ sort_by, page });
		})
		.catch(error => console.log(error));
}
function updateQueryStringParams ({ sort_by, page }) {
	// Construct URLSearchParams object instance from current URL querystring.
	const queryParams = new URLSearchParams(window.location.search);
			
	// Set new or modify existing parameter value. 
	queryParams.set('sort_by', sort_by);
	queryParams.set('page', page);
	// Replace current querystring with the new one.
	history.replaceState(null, null, `?${queryParams.toString()}`);
}

triggerAddToCartBtnsListeners();