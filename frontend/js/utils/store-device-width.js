const storeDeviceWidth = () => {
    window.addEventListener('DOMContentLoaded', () => {
        const device_width = window.innerWidth || document.documentElement.clientWidth || screen && screen.width;

        document.cookie = `device-width=${device_width}`;
        console.log('device_width: ', device_width);
    });
};

export default storeDeviceWidth;
