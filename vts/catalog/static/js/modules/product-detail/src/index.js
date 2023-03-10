import { triggerUpdateSingleAddProductArea, triggerAddToCartBtnsListeners } from '../../../utils/events.js';
import { ProductQtyInput } from '../../../utils/utils.js';
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

class ProductDetails extends ProductQtyInput {
    constructor() {
        super();
        this.product_id = this.add_to_cart_container ? this.add_to_cart_container.getAttribute('data-product-id') : null;

        this.triggerAddToCartBtnsListenersHandler();
        this.triggerUpdateSingleAddProductAreaHandler();
    }

    triggerAddToCartBtnsListenersHandler() {
        triggerAddToCartBtnsListeners();
    }
    triggerUpdateSingleAddProductAreaHandler() {
        if (this.product_id) {
            triggerUpdateSingleAddProductArea(this.product_id);
        }
    }
}

new ProductDetails();