export function triggerUpdateSingleAddProductArea (product_id) {
    const evnt = new CustomEvent('update_single_add_product_area', { detail: { product_id }});

    document.dispatchEvent(evnt);
}

export function triggerAddToCartBtnsListeners () {
    const evnt = new CustomEvent('add_to_cart_btns_listeners');

    document.dispatchEvent(evnt);
}