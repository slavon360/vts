import { tns } from 'tiny-slider';
import 'bootstrap/js/src/modal';
import { triggerUpdateSingleAddProductArea } from '@utils/events.js';
import { ProductQtyInput } from '@utils/utils.js';

import 'tiny-slider/dist/tiny-slider.css';
import '@styles/modules/tiny-slider/tiny-slider.scss'

let gallery_images = null;
// const mm_wrapper = document.querySelector('#mm-30');
const modal = document.querySelector('#exampleModalCenter');
modal.addEventListener('show.bs.modal', function (event) {
    const modal_body = this.querySelector('.modal-body');

    modal_body.classList.remove('show');
    const currentTarget = event.currentTarget;
    const relatedTarget = event.relatedTarget;
    const productTitle = relatedTarget.dataset['productTitle'];
    const productManufacturer = relatedTarget.dataset['productManufacturer'];
    const actualPrice = relatedTarget.dataset['productActualPrice'];
    const discountPrice = relatedTarget.dataset['productDiscountPrice'];
    const productDescription = relatedTarget.dataset['productDescription'];
    const productImagesUrls = relatedTarget.dataset['productImagesUrls'];
    const productId = relatedTarget.dataset['productId'];
    const productPrice = relatedTarget.dataset['productPrice'];
    const productLink = relatedTarget.dataset['productLink'];
    const productImageUrl = relatedTarget.dataset['productImgUrl'];
    const productQty = relatedTarget.dataset['productQty'];
    const preorder_phone = relatedTarget.dataset['productPreorderOnlyPhone'];
    const productDetailsLeft = document.querySelector('.product-details-left');
    const addToCartContainer = currentTarget.querySelector('.add-to-cart-container');
    const preorderOnlyBtn = currentTarget.querySelector('.preorder-only');
    const renderProductImages = () => {
        const img_regex = /(?:jpg|gif|png|jpeg)/gi;
        const details_images = document.createElement('div');
        details_images.classList.add('product-tns-details-images');
        const details_thumbs = document.createElement('div');
        details_thumbs.classList.add('product-tns-details-thumbs');
        const urls = productImagesUrls.split(img_regex).reduce((result, current, index) => {
            const ext = productImagesUrls.match(img_regex)[index];

            return result = current ? [...result, `${current}${ext}`] : result;
        }, []);

        productDetailsLeft.querySelectorAll('.slick-initialized').forEach(slider => $(slider).slick('unslick'));
        productDetailsLeft.innerHTML = '';

        urls.forEach(url => {
            const lg_image_container = document.createElement('div');
            const sm_image_container = document.createElement('div');
            const lg_img = document.createElement('img');
            const sm_img = document.createElement('img');

            lg_img.src = url;
            sm_img.src = url;

            lg_image_container.classList.add('product-image-item');
            sm_image_container.classList.add('product-thumb-item');
            lg_image_container.appendChild(lg_img);
            sm_image_container.appendChild(sm_img);

            details_images.appendChild(lg_image_container);
            details_thumbs.appendChild(sm_image_container);
            productDetailsLeft.insertAdjacentElement('beforeend', details_images);
            productDetailsLeft.insertAdjacentElement('beforeend', details_thumbs);
        });

        gallery_images = tns({
            container: '.product-tns-details-images',
            items: 1,
            controls: false,
            navAsThumbnails: true,
            // nav: false,
            navContainer: '.product-tns-details-thumbs',
            // controlsContainer: ''
        });
    }

    new ProductQtyInput();
    document.querySelector('#mm-30').classList.remove('mm-page', 'mm-slideout');

    addToCartContainer.setAttribute('data-product-id', productId);
    addToCartContainer.setAttribute('data-product-title', productTitle);
    addToCartContainer.setAttribute('data-product-qty', productQty);
    addToCartContainer.setAttribute('data-product-price', productPrice);
    addToCartContainer.setAttribute('data-product-link', productLink);
    addToCartContainer.setAttribute('data-product-img-url', productImageUrl);

    if (preorder_phone) {
        preorderOnlyBtn.querySelector('a').setAttribute('href', `tel:${preorder_phone}`);
        preorderOnlyBtn.classList.remove('d-none');
        addToCartContainer.classList.add('d-none');
        addToCartContainer.classList.remove('d-inline-block');
        modal_body.querySelector('.quantity').classList.add('d-none');
    } else {
        preorderOnlyBtn.classList.add('d-none');
        addToCartContainer.classList.remove('d-none');
        addToCartContainer.classList.add('d-inline-block');
        modal_body.querySelector('.quantity').classList.remove('d-none');
    }
    currentTarget.querySelector('.product-title').textContent = productTitle;
    currentTarget.querySelector('.product-details-ref').textContent = productManufacturer;
    currentTarget.querySelector('.product-desc').innerHTML = productDescription;

    if (gallery_images) {
        gallery_images.destroy();
    }
    renderProductImages();

    if (discountPrice) {
        currentTarget.querySelector('.new-price').textContent = `${discountPrice} грн.`;
        currentTarget.querySelector('.old-price').textContent = `${actualPrice} грн.`;
    } else {
        currentTarget.querySelector('.new-price').textContent = `${actualPrice} грн.`;
    }

    modal_body.classList.add('show');
    modal_body.querySelector('.cart-plus-minus-box').value = 1;
    triggerUpdateSingleAddProductArea(productId);
});

modal.addEventListener('hide.bs.modal', function (event) {
    document.querySelector('#mm-30').classList.add('mm-page', 'mm-slideout');
});