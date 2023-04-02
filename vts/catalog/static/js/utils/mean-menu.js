import Mmenu from 'mmenu-js';
require('@root/node_modules/mmenu-js/dist/mmenu.css');
require('@root/styles/modules/mean-menu/mean-menu.scss');

export const mmenu = () => {
    const menu_toggler = document.querySelector('.mean-menu-toggler');

    const mMenu = new Mmenu(document.querySelector('#mean-menu-mobile'), {
        hooks: {
            'open:before': panel => {
                menu_toggler.classList.add('menu-toggler-fixed');
            },
            'close:before': panel => {
                menu_toggler.classList.remove('menu-toggler-fixed');
            }
        }
    });
};
