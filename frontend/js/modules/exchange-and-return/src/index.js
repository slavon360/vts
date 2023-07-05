import { IconsLoader } from '@utils/icons-loader.js';
import '@modules/shopping-cart/src';
import '@modules/products-search/src';
import { slideToggle } from '@utils/slide-toggle.js';
import { mmenu } from '@utils/mean-menu.js';
import { scrollUp } from '@utils/scroll-up.js';
import { initFontAwesomeCommonIcons } from '@utils/fa-icons.js';
require('@styles/css/common.css');

class ExchangeAndReturn extends IconsLoader {
    constructor() {
        super();

        initFontAwesomeCommonIcons();
        slideToggle({
			selector: '.hm-minicart-trigger',
			target_container_selector: '.toggle-container'
		});
		scrollUp('#scrollUp');
        mmenu();
    }
};

const exchange_and_return_page = new ExchangeAndReturn();
