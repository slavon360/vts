const { PurgeCSS } = require('purgecss');
const fs = require('fs');

const common_contents = [
    'js/modules/products-search/src/*.js',
    'js/jquery.nice-select.min.js'
];
const modules = [
    {
        name: 'catalog',
        content: ['js/modules/modals/src/*.js'],
        css: ['styles/css/catalog/catalog.css']
    },
    {
        name: 'checkout',
        content: [],
        css: ['styles/css/checkout/checkout.css', 'styles/css/checkout/checkout-local-styles.css']
    },
    {
        name: 'homepage',
        content: ['js/modules/modals/src/*.js'],
        css: ['styles/css/homepage/homepage.css']
    },
    {
        name: 'product-detail',
        content: [],
        css: ['styles/css/product-detail/product-detail.css']
    },
    { 
        name: 'shopping-cart',
        content: [],
        css: ['styles/css/shopping-cart/shopping-cart.css']
    }
];

const purgeAll = () => {
    modules.forEach(async({name, content, css}) => {
        const [purgeCSSResults] = await new PurgeCSS().purge({
            content: [
                `html/${name}.html`,
                `js/modules/${name}/src/*.js`,
                ...common_contents,
                ...content
            ],
            css: css,
            keyframes: true
        });

        fs.promises.mkdir(`styles/dist/${name}`, {recursive: true})
            .then(x => {
                fs.promises.writeFile(`styles/dist/${name}/${name}.css`, purgeCSSResults.css)
                    .catch(err => {
                        if (err) {
                            console.error(err);
                        }
                    })
                    .then(() => {
                        console.log('file written successfully: ', name);
                    });
            });
    });
};

purgeAll();