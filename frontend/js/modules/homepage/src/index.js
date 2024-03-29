import { tns } from 'tiny-slider';
import { triggerAddToCartBtnsListeners } from '@utils/events.js';
import { slideToggle } from '@utils/slide-toggle.js';
import { mmenu } from '@utils/mean-menu.js';
import { scrollUp } from '@utils/scroll-up.js';
import { IconsLoader } from '@utils/icons-loader.js';
import '@modules/modals/src';
import '@modules/shopping-cart/src';
import { initFontAwesomeCommonIcons } from '@utils/fa-icons.js';
import imgLazy from '@utils/imgs-lazy.js';
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

		initFontAwesomeCommonIcons();
		triggerAddToCartBtnsListeners();
		slideToggle({
			selector: '.hm-minicart-trigger',
			target_container_selector: '.toggle-container'
		});
		scrollUp('#scrollUp');
		mmenu();
		new IconsLoader();

		setTimeout(() => {
			this.initProductsGallery();
		}, 1000);
	}

	initProductsGallery() {
		const hot_deal_elm = document.querySelector('.hot-deal-products.products-tns-carousel');
		const spare_parts_elm = document.querySelector('.spare-parts-products.products-tns-carousel');
		const boiler_products_elm = document.querySelector('.boiler-products.products-tns-carousel');
		const gas_boiler_products_elm = document.querySelector('.gas-boiler-products.products-tns-carousel');
		const banner_elm = document.querySelector('.banner-products.products-tns-carousel');

		if (hot_deal_elm) {
			this.hot_deal_products = tns({
				container: '.hot-deal-products.products-tns-carousel',
				controlsContainer: '.hot-deal-products.products-tns-controls',
				lazyload: true,
				responsive: {
					150: {
						items: 1,
						edgePadding: -1
					},
					768: {
						items: 2,
						edgePadding: 0
					},
					992: {
						items: 3
					},
					1366: {
						items: 4
					}
				},
				nav: false,
				onInit: imgLazy
			});
		}

		if (spare_parts_elm) {
			this.spare_parts_products = tns({
				container: '.spare-parts-products.products-tns-carousel',
				controlsContainer: '.spare-parts-products.products-tns-controls',
				lazyload: true,
				responsive: {
					150: {
						items: 1,
						edgePadding: -1
					},
					768: {
						items: 2,
						edgePadding: 0
					},
					992: {
						items: 3
					},
					1366: {
						items: 4
					}
				},
				nav: false,
				onInit: imgLazy
			});
		}

		if (boiler_products_elm) {
			this.boiler_products = tns({
				container: '.boiler-products.products-tns-carousel',
				controlsContainer: '.boiler-products.products-tns-controls',
				lazyload: true,
				responsive: {
					150: {
						items: 1,
						edgePadding: -1
					},
					768: {
						items: 2,
						edgePadding: -0
					},
					992: {
						items: 3
					},
					1366: {
						items: 4
					}
				},
				nav: false,
				onInit: imgLazy
			});
		}

		if (gas_boiler_products_elm) {
			this.gas_boiler_products = tns({
				container: '.gas-boiler-products.products-tns-carousel',
				controlsContainer: '.gas-boiler-products.products-tns-controls',
				lazyload: true,
				responsive: {
					150: {
						items: 1,
						edgePadding: -1
					},
					768: {
						items: 2,
						edgePadding: 0
					},
					992: {
						items: 3
					},
					1366: {
						items: 4
					}
				},
				nav: false,
				onInit: imgLazy
			});
		}

		if (banner_elm) {
			this.banners = tns({
				container: '.banner-products.products-tns-carousel',
				controlsContainer: '.banner-products.products-tns-controls',
				lazyload: true,
				items: 1,
				nav: false,
				responsive: {
					150: {
						edgePadding: -5
					},
					768: {
						edgePadding: 0
					}
				},
				onInit: imgLazy
			});
		}
	}
}

new Homepage();
