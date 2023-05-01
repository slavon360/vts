import { IconsLoader } from '@utils/icons-loader.js';
import '@modules/shopping-cart/src';
import '@modules/products-search/src';
import { slideToggle } from '@utils/slide-toggle.js';
import { mmenu } from '@utils/mean-menu.js';
import { scrollUp } from '@utils/scroll-up.js';
import { AOSX } from 'aosx';
import 'aosx/src/css/animation.css'; 
require('@styles/css/common.css');
require('@styles/modules/repair/repair.scss');

class Repair extends IconsLoader {
    constructor() {
        super();

        slideToggle({
			selector: '.hm-minicart-trigger',
			target_container_selector: '.toggle-container'
		});
       const aosx = new AOSX({
            duration: 1200,
            // easing: 'ease-in-out-back'
        });
        aosx.init();
        console.log(aosx);
		scrollUp('#scrollUp');
        mmenu();
    }
};

const repair_page = new Repair();
