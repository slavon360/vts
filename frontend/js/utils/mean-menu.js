import Mmenu from 'mmenu-js';
import '@root/node_modules/mmenu-js/dist/mmenu.css';
import '@root/styles/modules/mean-menu/mean-menu.scss';

export const mmenu = () => {
    const menu_toggler = document.querySelector('.mean-menu-toggler');

    const mMenu = new Mmenu(document.querySelector('#mean-menu-mobile'), {
        navbar: {
            title: 'Каталог'
        },
        hooks: {
            'open:before': panel => {
                menu_toggler.classList.add('menu-toggler-fixed');
            },
            'close:before': panel => {
                menu_toggler.classList.remove('menu-toggler-fixed');
            }
        },
        slidingSubmenus: false,
        offCanvas: {
            position: 'bottom'
        }
    });
};
