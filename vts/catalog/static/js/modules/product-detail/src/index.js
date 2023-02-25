import { triggerUpdateSingleAddProductArea, triggerAddToCartBtnsListeners } from '../../../utils/events.js';

class ProductDetails {
    constructor() {
        this.product_qty_input = document.querySelector('.cart-plus-minus-box');
        this.add_to_cart_container = document.querySelector('.add-to-cart-container');
        this.product_id = this.add_to_cart_container ? this.add_to_cart_container.getAttribute('data-product-id') : null;

        this.triggerAddToCartBtnsListenersHandler();
        this.triggerUpdateSingleAddProductAreaHandler();
        this.bindEventListeners();
    }

    triggerAddToCartBtnsListenersHandler() {
        triggerAddToCartBtnsListeners();
    }
    triggerUpdateSingleAddProductAreaHandler() {
        if (this.product_id) {
            triggerUpdateSingleAddProductArea(this.product_id);
        }
    }
    changeProductQuantity(event) {
        const { target: { value } } = event;

        this.add_to_cart_container.setAttribute('data-product-qty', value > 0 ? value : 1);
    }
    bindEventListeners() {
        this.product_qty_input.addEventListener('keyup', this.changeProductQuantity.bind(this));
    }
}

new ProductDetails();