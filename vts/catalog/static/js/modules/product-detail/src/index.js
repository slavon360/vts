import { tns } from 'tiny-slider';
import { triggerUpdateSingleAddProductArea, triggerAddToCartBtnsListeners } from '@root/js/utils/events.js';
import { ProductQtyInput } from '../../../utils/utils.js';
import { slideToggle } from '@root/js/utils/slide-toggle.js';
import { countdown } from '@root/js/utils/countdown.js';
import { scrollUp } from '@root/js/utils/scroll-up.js';
import { IconsLoader } from '@root/js/modules/icons-loader/src';
import '@root/js/modules/products-search/src';
import '@root/js/modules/shopping-cart/src';
require('@root/styles/css/material-design-iconic-font.min.css');
require('@root/styles/css/font-awesome.min.css');
require('@root/styles/css/fontawesome-stars.css');
require('@root/styles/css/meanmenu.css');
require('@root/styles/css/owl.carousel.min.css');
require('@root/styles/css/slick.css');
require('@root/styles/css/animate.css');
require('@root/styles/css/jquery-ui.min.css');
require('@root/styles/css/venobox.css');
require('@root/styles/css/nice-select.css');
require('@root/styles/css/magnific-popup.css');
require('@root/styles/css/bootstrap.min.css');
require('@root/styles/css/helper.css');
require('@root/styles/css/style.css');
require('@root/styles/css/responsive.css');
require('@root/styles/modules/product-detail/product-detail.scss');
require('@root/styles/modules/slide-toggle/slide-toggle.scss');

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