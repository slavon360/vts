const viber_logo = require('@images/about/xnsfrx5bqgauhafabmbw_aetYXFF_OIYChH8_ykK28Yd.png');
const vts_logo = require('@images/about/vts.png');
const images_collection = {
	'about/xnsfrx5bqgauhafabmbw_aetYXFF_OIYChH8_ykK28Yd.png': viber_logo,
	'logo-image': vts_logo
};

const updateImagesSources = img_elements => {
	img_elements.forEach(img => {
		const img_name = img.getAttribute('data-image-name');
		img.src = images_collection[img_name];
	});
}

export class IconsLoader {
	constructor() {
		this.phone_icon_imgs = document.querySelectorAll('.phone-icon-img');
		this.site_logo_imgs = document.querySelectorAll('.site-logo-img');

		this.setPhoneImagesSources();
		this.setSiteLogosSources();
	}

	setPhoneImagesSources() {
		updateImagesSources(this.phone_icon_imgs);
	}

	setSiteLogosSources() {
		updateImagesSources(this.site_logo_imgs);
	}
}