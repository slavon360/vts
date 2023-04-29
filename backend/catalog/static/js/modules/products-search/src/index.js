import { debounce } from '@utils/utils.js';

const searchInput = document.querySelector('#search-products');
const productsResults = document.querySelector('.searched-results[data-phones]');
const phones = productsResults.dataset.phones.split('|').map(nmb => (`
<a href="tel:${nmb.replace(/ /g, '')}">${nmb}</a>
`)).join('');
let prevSearchText = null;

function searchProductHandler(event) {
    const searchQuery = event.target.value.trim();

    if (!searchQuery) {
        productsResults.innerHTML = '';
    }
    if (searchQuery && searchQuery !== prevSearchText) {
        productsResults.innerHTML = '<div class="preloader"></div>';
        fetch(`/products-search/api?title=${searchQuery}`)
            .then(response => response.json())
            .then(data => {
            const { results } = data;
            const content = results.length ?
                results.map(({ get_absolute_url, title }) => {
                const query = new RegExp(searchQuery, 'ig');
                const titleContent = title.replace(query, `<b>${searchQuery}</b>`).toLowerCase();
                return `<a class="searched-product" href="${get_absolute_url}">${titleContent}</a>`;
                }).join('') :
                `<div class="empty-results">
                Відсутні товари за даним запитом
                <br>
                Зв'яжіться будь ласка з нами для уточнення інформації:
                <br>
                ${phones}
                </div>`;
            productsResults.innerHTML = content;
            showSearchedResults();
            })
            .catch(error => console.error(error));
        
        prevSearchText = searchQuery;        
    }
}

function hideSearchedResults() {
    setTimeout(() => {
        productsResults.classList.add('d-none');
    }, 500);
}
function showSearchedResults() {
    productsResults.classList.remove('d-none');
}

searchInput.addEventListener('keyup', debounce(searchProductHandler, 800));
searchInput.addEventListener('blur', hideSearchedResults);
searchInput.addEventListener('focus', showSearchedResults);