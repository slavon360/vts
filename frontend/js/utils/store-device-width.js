const storeDeviceWidth = () => {
    window.addEventListener('DOMContentLoaded', () => {
        const device_width = window.innerWidth || document.documentElement.clientWidth;

        document.cookie = `device-width=${device_width}`;
    });
};

export default storeDeviceWidth;
