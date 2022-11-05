(function ($) {
	"use strict";
	let current_page = 1;
	const $sort_products_catalog = $('#sort_products_catalog');
	const $toolbar_amount_active_page = $('.toolbar-amount .active-page-nmb');
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
		const $pagination_area = $('.paginatoin-area');
		// const page_nmb = previous && previous.match(/(page=)(\d*)/g)[0].replace('page=', '');
		// const current_page_number = page_nmb ? +page_nmb + 1 : 1;
		const last_page_number = next ? Math.ceil(count / results.length) : current_page;
		const pages_array = makePagesArray({
			current_page: current_page,
			last_page: last_page_number,
			show_on_both_sides: 3
		});
		const previous_page = previous 
		? `<li>
				<div data-link="${previous}" class="Previous page-number"><i class="fa fa-chevron-left"></i> Попередня</div>
			</li>`
		: '';
		const next_page = next 
		? `<li>
				<div data-link="${next}" class="Next page-number">Наступна <i class="fa fa-chevron-right"></i></div>
			</li>`
		: '';
		const pages_elements = pages_array.map(({
			page,
			link,
			active
		}) => `<li ${active ? 'class="active"' : ''}><div class="page-number" data-link="${link}">${page}</div></li>`).join('').trim();

		$pagination_area.off('click', '.page-number', pageClickHandler);

		$pagination_area.html(`
			<div class="row">
				<div class="col-lg-4 col-md-3 d-none d-md-block">
					<p>Сторінка <b>${current_page}</b> з <b>${last_page_number}</b></p>
				</div>
				<div class="col-lg-8 col-md-9">
					<ul class="pagination-box">
						${previous_page}
						${pages_elements}
						${next_page}
					</ul>
				</div>
			</div>
		`);

		$pagination_area.on('click', '.page-number', pageClickHandler);
	};
	const renderProductsGrid = (products) => {
		const $grid_view_products = $('.grid-view-products');

		$grid_view_products.html('');
		products.forEach(({
			get_absolute_url,
			manufacturer,
			title,
			discount_price,
			get_actual_discount_price,
			get_actual_price,
			first_image
		}) => {
			const price_block = discount_price 
			? 
			`
			<span class="new-price new-price-2">${get_actual_discount_price} грн.</span>
			<span class="old-price">${get_actual_price} грн.</span>
			`
			: `<span class="new-price">${get_actual_price} грн.</span>`;

			$grid_view_products.append(
				`
				<div class="col-lg-3 col-md-4 col-sm-6 mt-40">
					<div class="single-product-wrap">
						<div class="product-image">
							<a href="${get_absolute_url}">
								<img src="${first_image.image_url}" alt="${title}">
							</a>
						</div>
						<div class="product_desc">
							<div class="product_desc_info">
								<div class="product-review">
									<h5 class="manufacturer">
										<a href="">${manufacturer}</a>
									</h5>
									<div class="rating-box">
										<ul class="rating">
											<li><i class="fa fa-star-o"></i></li>
											<li><i class="fa fa-star-o"></i></li>
											<li><i class="fa fa-star-o"></i></li>
											<li class="no-star"><i class="fa fa-star-o"></i></li>
											<li class="no-star"><i class="fa fa-star-o"></i></li>
										</ul>
									</div>
								</div>
								<h4><a class="product_name" href="${get_absolute_url}">${title}</a></h4>
								<div class="price-box">
									${price_block}
								</div>
							</div>
							<div class="add-actions">
								<ul class="add-actions-link">
									<li class="add-cart active"><a href="#">Купити</a></li>
									<li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
									<li><a class="links-details" href="#"><i class="fa fa-heart-o"></i></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				`
			);
		});
	};
	const renderProductsList = (products) => {
		const $list_view_products = $('.list-view-products');

		$list_view_products.html('');
		products.forEach(({
			get_absolute_url,
			manufacturer,
			title,
			discount_price,
			get_actual_discount_price,
			get_actual_price,
			first_image
		}, index) => {
			const price_block = discount_price 
			? 
			`
			<span class="new-price new-price-2">${get_actual_discount_price} грн.</span>
			<span class="old-price">${get_actual_price} грн.</span>
			`
			: `<span class="new-price">${get_actual_price} грн.</span>`;

			$list_view_products.append(
				`
				<div class="row product-layout-list ${index === products.length - 1 ? 'last-child' : ''}">
					<div class="col-lg-3 col-md-5">
						<div class="product-image">
							<a href="${get_absolute_url}">
								<img src="${first_image.image_url}" alt="${title}">
							</a>
						</div>
					</div>
					<div class="col-lg-5 col-md-7">
						<div class="product_desc">
							<div class="product_desc_info">
								<div class="product-review">
									<h5 class="manufacturer">
										<a href="">${manufacturer}</a>
									</h5>
									<div class="rating-box">
										<ul class="rating">
											<li><i class="fa fa-star-o"></i></li>
											<li><i class="fa fa-star-o"></i></li>
											<li><i class="fa fa-star-o"></i></li>
											<li class="no-star"><i class="fa fa-star-o"></i></li>
											<li class="no-star"><i class="fa fa-star-o"></i></li>
										</ul>
									</div>
								</div>
								<div class="price-box">
									${price_block}
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="shop-add-action">
							<ul class="add-actions-link">
								<li class="add-cart"><a href="#">Купити</a></li>
								<li class="wishlist"><a href=""><i class="fa fa-heart-o"></i>Додати до списку бажань</a></li>
								<li><a class="quick-view" data-toggle="modal" data-target="#exampleModalCenter" href="#"><i class="fa fa-eye"></i>Швидкий перегляд</a></li>
							</ul>
						</div>
					</div>
				</div>
				`
			);
		});
	};

	function sortProductsHandler () {
		const sort_by = this.value;
		const category_id = $(this).data('category_id');
		const subcategory_id = $(this).data('subcategory_id');
		const subsubcategory_id = $(this).data('subsubcategory_id');
		const queries = [
			category_id ? `&category_id=${category_id}` : null,
			subcategory_id ? `&subcategory_id=${subcategory_id}` : null,
			subsubcategory_id ? `&subsubcategory_id=${subsubcategory_id}` : null
		].join('');
		current_page = 1;

		updateQueryStringParams({ sort_by, page: current_page });
		$toolbar_amount_active_page.text(current_page);
		
		$.ajax({
			url: `/products-catalog/api?sort_by=${sort_by}${queries}`,
			success: function (response) {
				updateProductsHandler(sort_by, response);
			}
		});
	}
	$sort_products_catalog.on('change', sortProductsHandler);
	function updateProductsHandler (sort_by, response) {
		let { results = [], next, previous } = response;

		if (sort_by.includes('price')) {
			const sign = sort_by.includes('ascending') ? 1 : -1;

			results = results.sort((a, b) => parseFloat(a.get_actual_price.replace(/,/g, '')) > parseFloat(b.get_actual_price.replace(/,/g, '')) 
			? sign 
			: sign * -1);
		}

		renderProductsGrid(results);
		renderProductsList(results);
		if (next || previous) {
			renderPagination(response);
		}
	}

	function pageClickHandler () {
		const url = $(this).data('link');
		const qs_obj = JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
		const { sort_by, page } = qs_obj;
		current_page = Number(page) || 1;

		$toolbar_amount_active_page.text(current_page);
		$.ajax({
			url,
			success: function (response) {
				updateProductsHandler(sort_by, response);
				updateQueryStringParams({ sort_by, page });
			}
		});
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
})(jQuery);