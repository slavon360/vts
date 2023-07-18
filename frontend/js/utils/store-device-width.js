const storeDeviceWidth = () => {
    window.addEventListener('DOMContentLoaded', () => {
        const device_width = window.innerWidth || document.documentElement.clientWidth || screen && screen.width;
        const images = document.querySelectorAll('img:not(.inline-loaded)');

        images.forEach(image => {
            if (image.src && image.src.trim()) {
                image.setAttribute('src', `${image.src}?device-width=${device_width}`);
            }
        });

        document.cookie = `device-width=${device_width};path=/`;
    });
};

export default storeDeviceWidth;
