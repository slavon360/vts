import { triggerUpdateSingleAddProductArea, triggerAddToCartBtnsListeners } from '../../../utils/events.js';

const add_to_cart_container = document.querySelector('.add-to-cart-container');
const product_id = add_to_cart_container ? add_to_cart_container.getAttribute('data-product-id') : null;

triggerAddToCartBtnsListeners();
if (product_id) {
    triggerUpdateSingleAddProductArea(product_id);
}