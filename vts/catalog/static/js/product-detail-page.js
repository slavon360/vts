(function() {
    'use strict';
    const add_to_cart_container = document.querySelector('.add-to-cart-container');
    const product_id = add_to_cart_container ? add_to_cart_container.getAttribute('data-product-id') : null;
    
    function triggerUpdateSingleAddProductArea (product_id) {
		const evnt = new CustomEvent('update_single_add_product_area', { detail: { product_id }});

		document.dispatchEvent(evnt);
	}

    function triggerAddToCartBtnsListeners () {
		const evnt = new CustomEvent('add_to_cart_btns_listeners');

		document.dispatchEvent(evnt);
	}

    triggerAddToCartBtnsListeners();
    if (product_id) {
        triggerUpdateSingleAddProductArea(product_id);
    }
})();