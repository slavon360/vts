import { triggerUpdateSingleAddProductArea } from '../../../utils/events.js';
import { ProductQtyInput } from '../../../utils/utils.js';

$('#exampleModalCenter').on('show.bs.modal', function (event) {
    const modal_body = this.querySelector('.modal-body');

    modal_body.classList.remove('show');
    const currentTarget = event.currentTarget;
    const $relatedTarget = $(event.relatedTarget);
    const productTitle = $relatedTarget.data('product-title');
    const productManufacturer = $relatedTarget.data('product-manufacturer');
    const actualPrice = $relatedTarget.data('product-actual-price');
    const discountPrice = $relatedTarget.data('product-discount-price');
    const productDescription = $relatedTarget.data('product-description');
    const productImagesUrls = $relatedTarget.data('product-images-urls');
    const productId = $relatedTarget.data('product-id');
    const productPrice = $relatedTarget.data('product-price');
    const productLink = $relatedTarget.data('product-link');
    const productImageUrl = $relatedTarget.data('product-img-url');
    const productQty = $relatedTarget.data('product-qty');
    const productDetailsLeft = document.querySelector('.product-details-left');
    const addToCartContainer = currentTarget.querySelector('.add-to-cart-container');
    const renderProductImages = () => {
        const img_regex = /(?:jpg|gif|png|jpeg)/gi;
        const details_images = document.createElement('div');
        details_images.classList.add('slider-navigation-1', 'product-details-images');
        const details_thumbs = document.createElement('div');
        details_thumbs.classList.add('product-details-thumbs', 'slider-thumbs-1');
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

            lg_image_container.classList.add('lg-image');
            sm_image_container.classList.add('sm-image');
            lg_image_container.appendChild(lg_img);
            sm_image_container.appendChild(sm_img);

            details_images.appendChild(lg_image_container);
            details_thumbs.appendChild(sm_image_container);
            productDetailsLeft.insertAdjacentElement('beforeend', details_images);
            productDetailsLeft.insertAdjacentElement('beforeend', details_thumbs);
        });

        $('.product-details-images').not('.slick-initialized').each(function(){
            const $this = $(this);
            const $thumb = $this.siblings('.product-details-thumbs');

            $this.slick({
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 5000,
                dots: false,
                infinite: true,
                centerMode: false,
                centerPadding: 0,
                asNavFor: $thumb,
            });
        });
        $('.product-details-thumbs').not('.slick-initialized').each(function(){
            var $this = $(this);
            var $details = $this.siblings('.product-details-images');
            $this.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 5000,
                dots: false,
                infinite: true,
                focusOnSelect: true,
                centerMode: true,
                centerPadding: 0,
                prevArrow: '<span class="slick-prev"><i class="fa fa-angle-left"></i></span>',
                nextArrow: '<span class="slick-next"><i class="fa fa-angle-right"></i></span>',
                asNavFor: $details,
            });
        });
    }

    new ProductQtyInput();

    addToCartContainer.setAttribute('data-product-id', productId);
    addToCartContainer.setAttribute('data-product-title', productTitle);
    addToCartContainer.setAttribute('data-product-qty', productQty);
    addToCartContainer.setAttribute('data-product-price', productPrice);
    addToCartContainer.setAttribute('data-product-link', productLink);
    addToCartContainer.setAttribute('data-product-img-url', productImageUrl);
    currentTarget.querySelector('.product-title').textContent = productTitle;
    currentTarget.querySelector('.product-details-ref').textContent = productManufacturer;
    currentTarget.querySelector('.product-desc').innerHTML = productDescription;

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