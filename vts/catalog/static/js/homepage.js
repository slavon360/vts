(function() {
    'use strict';

    function triggerAddToCartBtnsListeners () {
		const evnt = new CustomEvent('add_to_cart_btns_listeners');

		document.dispatchEvent(evnt);
	}

    triggerAddToCartBtnsListeners();
})();