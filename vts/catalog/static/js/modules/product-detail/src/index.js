import { tns } from 'tiny-slider';
import { triggerUpdateSingleAddProductArea, triggerAddToCartBtnsListeners } from '@utils/events.js';
import { ProductQtyInput } from '@utils/utils.js';
import { slideToggle } from '@utils/slide-toggle.js';
import { countdown } from '@utils/countdown.js';
import { scrollUp } from '@utils/scroll-up.js';
import { IconsLoader } from '@modules/icons-loader/src';
import '@modules/products-search/src';
import '@modules/shopping-cart/src';
import { mmenu } from '@utils/mean-menu.js';
require('@styles/css/common.css');
require('@styles/modules/product-detail/product-detail.scss');
require('@styles/modules/slide-toggle/slide-toggle.scss');

class ProductDetails extends ProductQtyInput {
    constructor() {
        super();
        this.product_id = this.add_to_cart_container ? this.add_to_cart_container.getAttribute('data-product-id') : null;
        this.product_gallery = null;
        this.icons_loader = new IconsLoader();
        this.initProductGallery();

        this.triggerAddToCartBtnsListenersHandler();
        this.triggerUpdateSingleAddProductAreaHandler();
        slideToggle({
            selector: '.hm-minicart-trigger',
            target_container_selector: '.toggle-container'
        });
        countdown('.li-countdown');
        scrollUp('#scrollUp');
        mmenu();
    }

    triggerAddToCartBtnsListenersHandler() {
        triggerAddToCartBtnsListeners();
    }
    triggerUpdateSingleAddProductAreaHandler() {
        if (this.product_id) {
            triggerUpdateSingleAddProductArea(this.product_id);
        }
    }
    initProductGallery() {
        this.product_gallery = tns({
            container: '.product-tns-details-images',
            items: 1,
            controls: false,
            navAsThumbnails: true,
            // nav: false,
            navContainer: '.product-tns-details-thumbs',
            // controlsContainer: ''
        });
    }
}

new ProductDetails();