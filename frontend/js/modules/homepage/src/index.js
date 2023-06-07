import { tns } from 'tiny-slider';
import { triggerAddToCartBtnsListeners } from '@utils/events.js';
import { slideToggle } from '@utils/slide-toggle.js';
import { mmenu } from '@utils/mean-menu.js';
import { scrollUp } from '@utils/scroll-up.js';
import { IconsLoader } from '@utils/icons-loader.js';
import '@modules/shopping-cart/src';
import 'tiny-slider/dist/tiny-slider.css';
require('@styles/modules/homepage/homepage.scss');

require('@styles/css/common.css');

class Homepage {
	constructor () {
		this.hot_deal_products = null;
		this.spare_parts_products = null;
		this.boiler_products = null;
		this.gas_boiler_products = null;
		this.banners = null;


		triggerAddToCartBtnsListeners();
		slideToggle({
			selector: '.hm-minicart-trigger',
			target_container_selector: '.toggle-container'
		});
		scrollUp('#scrollUp');
		mmenu();
		new IconsLoader();

		this.initProductsGallery();
	}

	initProductsGallery() {
		this.hot_deal_products = tns({
			container: '.hot-deal-products.products-tns-carousel',
			controlsContainer: '.hot-deal-products.products-tns-controls',
			lazyload: true,
			responsive: {
				150: {
					items: 1
				},
				768: {
					items: 2
				},
				992: {
					items: 3
				},
				1366: {
					items: 4
				}
			},
			nav: false
		});
		this.spare_parts_products = tns({
			container: '.spare-parts-products.products-tns-carousel',
			controlsContainer: '.spare-parts-products.products-tns-controls',
			lazyload: true,
			responsive: {
				150: {
					items: 1
				},
				768: {
					items: 2
				},
				992: {
					items: 3
				},
				1366: {
					items: 4
				}
			},
			nav: false
		});
		this.boiler_products = tns({
			container: '.boiler-products.products-tns-carousel',
			controlsContainer: '.boiler-products.products-tns-controls',
			lazyload: true,
			responsive: {
				150: {
					items: 1
				},
				768: {
					items: 2
				},
				992: {
					items: 3
				},
				1366: {
					items: 4
				}
			},
			nav: false
		});
		this.gas_boiler_products = tns({
			container: '.gas-boiler-products.products-tns-carousel',
			controlsContainer: '.gas-boiler-products.products-tns-controls',
			lazyload: true,
			responsive: {
				150: {
					items: 1
				},
				768: {
					items: 2
				},
				992: {
					items: 3
				},
				1366: {
					items: 4
				}
			},
			nav: false
		});
		this.banners = tns({
			container: '.banner-products.products-tns-carousel',
			controlsContainer: '.banner-products.products-tns-controls',
			lazyload: true,
			items: 1,
			nav: false
		});
	}
}

new Homepage();
