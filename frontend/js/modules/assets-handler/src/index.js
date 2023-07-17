import storeDeviceWidth from '@utils/store-device-width.js';

storeDeviceWidth();
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader-container');
  preloader.classList.add('d-none');
});
