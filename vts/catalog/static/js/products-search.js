(function ($) {
	"use strict";

	const $search_input = $('#search-products');
	const $products_results = $('.searched-results');
	const phones = $products_results.data('phones').split('|').map(nmb => (`
		<a href="tel:${nmb.replace(/ /g, '')}">${nmb}</a>
	`)).join('');
	let prev_search_text = null;

	function searchProductHandler (event) {
		const { target: { value: search_query } } = event;

		if (!search_query.trim()) {
			$products_results.html('');
		}
		if (search_query.trim() && search_query !== prev_search_text) {
			$products_results.html('<div class="preloader"></div>');
			$.ajax({
				url: `/products-search/api?title=${search_query}`,
				success: function (response) {
					prev_search_text = search_query;
					const { results } = response;
					const content = results.length ?
					results.map(({ get_absolute_url, title }) => {
						const query = new RegExp(search_query, 'ig');
						const title_content = title.replace(query, `<b>${search_query}</b>`).toLowerCase();
						return `<a class="searched-product" href="${get_absolute_url}">${title_content}</a>`;
					}).join('') :
					`<div class="empty-results">
						Відсутні товари за даним запитом
						<br>
						Зв'яжіться будь ласка з нами для уточнення інформації:
						<br>
						${phones}
					</div>`;
					$products_results.html(content);
					showSearchedResults();
				}
			});
		}
	}

	function hideSearchedResults () {
		setTimeout(() => {
			$products_results.addClass('d-none');
		}, 500);
	}

	function showSearchedResults () {
		$products_results.removeClass('d-none');
	}

	$search_input.on('keyup', window.debounce(searchProductHandler, 800));
	$search_input.on('blur', hideSearchedResults);
	$search_input.on('focus', showSearchedResults);
})(jQuery)