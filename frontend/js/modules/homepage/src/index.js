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
		this.product_gallery = null;

		triggerAddToCartBtnsListeners();
		slideToggle({
			selector: '.hm-minicart-trigger',
			target_container_selector: '.toggle-container'
		});
		scrollUp('#scrollUp');
		mmenu();
		new IconsLoader();

		this.initProductGallery();
	}

	initProductGallery() {
        this.product_gallery = tns({
            container: '.products-tns-carousel',
			controlsContainer: '.products-tns-controls',
            items: 4,
            // controls: false,
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
				}
			},
            nav: false
            // controlsContainer: ''
        });
    }
}

new Homepage();
