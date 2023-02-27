import { triggerUpdateSingleAddProductArea, triggerAddToCartBtnsListeners } from '../../../utils/events.js';
import { ProductQtyInput } from '../../../utils/utils.js';

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