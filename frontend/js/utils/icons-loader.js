const viber_logo = require('@backend/catalog/static/images/about/xnsfrx5bqgauhafabmbw_aetYXFF_OIYChH8_ykK28Yd.png');
const images_collection = {
    'about/xnsfrx5bqgauhafabmbw_aetYXFF_OIYChH8_ykK28Yd.png': viber_logo
};

export class IconsLoader {
    constructor() {
        this.phone_icon_imgs = document.querySelectorAll('.phone-icon-img');

        this.setPhoneImagesSources();
    }

    setPhoneImagesSources() {
        this.phone_icon_imgs.forEach(img => {
            const img_name = img.getAttribute('data-image-name');
            img.src = images_collection[img_name];
        });
    }
}