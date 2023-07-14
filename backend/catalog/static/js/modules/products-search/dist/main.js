/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/utils/utils.js":
/*!***************************!*\
  !*** ./js/utils/utils.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debounce": () => (/* binding */ debounce)
/* harmony export */ });
/* unused harmony exports numberWithCommas, ProductQtyInput */
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
class ProductQtyInput {
  constructor() {
    this.product_qty_input = document.querySelector('.cart-plus-minus-box');
    this.add_to_cart_container = document.querySelector('.add-to-cart-container');
    this.bindEventListeners();
  }
  changeProductQuantity(event) {
    const {
      target: {
        value
      }
    } = event;
    this.add_to_cart_container.setAttribute('data-product-qty', value > 0 ? value : 1);
  }
  bindEventListeners() {
    if (this.product_qty_input) {
      this.product_qty_input.addEventListener('keyup', this.changeProductQuantity.bind(this));
    }
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************************!*\
  !*** ./js/modules/products-search/src/index.js ***!
  \*************************************************/
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/utils.js */ "./js/utils/utils.js");

const searchInput = document.querySelector('#search-products');
const productsResults = document.querySelector('.searched-results[data-phones]');
const phones = productsResults.dataset.phones.split('|').map(nmb => `
<a href="tel:${nmb.replace(/ /g, '')}">${nmb}</a>
`).join('');
let prevSearchText = null;
function searchProductHandler(event) {
  const searchQuery = event.target.value.trim();
  if (!searchQuery) {
    productsResults.innerHTML = '';
  }
  if (searchQuery && searchQuery !== prevSearchText) {
    productsResults.innerHTML = '<div class="preloader"></div>';
    fetch(`/products-search/api?title=${searchQuery}`).then(response => response.json()).then(data => {
      const {
        results
      } = data;
      const content = results.length ? results.map(({
        get_absolute_url,
        title
      }) => {
        const query = new RegExp(searchQuery, 'ig');
        const titleContent = title.replace(query, `<b>${searchQuery}</b>`).toLowerCase();
        return `<a class="searched-product" href="${get_absolute_url}">${titleContent}</a>`;
      }).join('') : `<div class="empty-results">
                Відсутні товари за даним запитом
                <br>
                Зв'яжіться будь ласка з нами для уточнення інформації:
                <br>
                ${phones}
                </div>`;
      productsResults.innerHTML = content;
      showSearchedResults();
    }).catch(error => console.error(error));
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
searchInput.addEventListener('keyup', (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__.debounce)(searchProductHandler, 800));
searchInput.addEventListener('blur', hideSearchedResults);
searchInput.addEventListener('focus', showSearchedResults);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDRSxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQzlDO0FBRUFsQyxXQUFXLENBQUNGLGdCQUFnQixDQUFDLE9BQU8sRUFBRXhCLHlEQUFRLENBQUNtQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMxRVQsV0FBVyxDQUFDRixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUVpQyxtQkFBbUIsQ0FBQztBQUN6RC9CLFdBQVcsQ0FBQ0YsZ0JBQWdCLENBQUMsT0FBTyxFQUFFNkIsbUJBQW1CLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Z0cy1mcm9udC8uL2pzL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovL3Z0cy1mcm9udC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92dHMtZnJvbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Z0cy1mcm9udC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Z0cy1mcm9udC8uL2pzL21vZHVsZXMvcHJvZHVjdHMtc2VhcmNoL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHRpbWVvdXQgPSAzMDApe1xyXG5cdGxldCB0aW1lcjtcclxuXHRyZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lcik7XHJcblx0XHR0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG5cdFx0fSwgdGltZW91dCk7XHJcblx0fTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlcldpdGhDb21tYXMoeCkge1xyXG5cdHJldHVybiB4LnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD88IVxcLlxcZCopKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIsXCIpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvZHVjdFF0eUlucHV0IHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHR0aGlzLnByb2R1Y3RfcXR5X2lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnQtcGx1cy1taW51cy1ib3gnKTtcclxuICAgICAgICB0aGlzLmFkZF90b19jYXJ0X2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdG8tY2FydC1jb250YWluZXInKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRjaGFuZ2VQcm9kdWN0UXVhbnRpdHkoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCB7IHRhcmdldDogeyB2YWx1ZSB9IH0gPSBldmVudDtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRfdG9fY2FydF9jb250YWluZXIuc2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtcXR5JywgdmFsdWUgPiAwID8gdmFsdWUgOiAxKTtcclxuICAgIH1cclxuICAgIGJpbmRFdmVudExpc3RlbmVycygpIHtcclxuXHRcdGlmICh0aGlzLnByb2R1Y3RfcXR5X2lucHV0KSB7XHJcblx0XHRcdHRoaXMucHJvZHVjdF9xdHlfaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmNoYW5nZVByb2R1Y3RRdWFudGl0eS5iaW5kKHRoaXMpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdAdXRpbHMvdXRpbHMuanMnO1xyXG5cclxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXByb2R1Y3RzJyk7XHJcbmNvbnN0IHByb2R1Y3RzUmVzdWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hlZC1yZXN1bHRzW2RhdGEtcGhvbmVzXScpO1xyXG5jb25zdCBwaG9uZXMgPSBwcm9kdWN0c1Jlc3VsdHMuZGF0YXNldC5waG9uZXMuc3BsaXQoJ3wnKS5tYXAobm1iID0+IChgXHJcbjxhIGhyZWY9XCJ0ZWw6JHtubWIucmVwbGFjZSgvIC9nLCAnJyl9XCI+JHtubWJ9PC9hPlxyXG5gKSkuam9pbignJyk7XHJcbmxldCBwcmV2U2VhcmNoVGV4dCA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBzZWFyY2hQcm9kdWN0SGFuZGxlcihldmVudCkge1xyXG4gICAgY29uc3Qgc2VhcmNoUXVlcnkgPSBldmVudC50YXJnZXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgIGlmICghc2VhcmNoUXVlcnkpIHtcclxuICAgICAgICBwcm9kdWN0c1Jlc3VsdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB9XHJcbiAgICBpZiAoc2VhcmNoUXVlcnkgJiYgc2VhcmNoUXVlcnkgIT09IHByZXZTZWFyY2hUZXh0KSB7XHJcbiAgICAgICAgcHJvZHVjdHNSZXN1bHRzLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwicHJlbG9hZGVyXCI+PC9kaXY+JztcclxuICAgICAgICBmZXRjaChgL3Byb2R1Y3RzLXNlYXJjaC9hcGk/dGl0bGU9JHtzZWFyY2hRdWVyeX1gKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB7IHJlc3VsdHMgfSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSByZXN1bHRzLmxlbmd0aCA/XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzLm1hcCgoeyBnZXRfYWJzb2x1dGVfdXJsLCB0aXRsZSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBSZWdFeHAoc2VhcmNoUXVlcnksICdpZycpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGVDb250ZW50ID0gdGl0bGUucmVwbGFjZShxdWVyeSwgYDxiPiR7c2VhcmNoUXVlcnl9PC9iPmApLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYDxhIGNsYXNzPVwic2VhcmNoZWQtcHJvZHVjdFwiIGhyZWY9XCIke2dldF9hYnNvbHV0ZV91cmx9XCI+JHt0aXRsZUNvbnRlbnR9PC9hPmA7XHJcbiAgICAgICAgICAgICAgICB9KS5qb2luKCcnKSA6XHJcbiAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cImVtcHR5LXJlc3VsdHNcIj5cclxuICAgICAgICAgICAgICAgINCS0ZbQtNGB0YPRgtC90ZYg0YLQvtCy0LDRgNC4INC30LAg0LTQsNC90LjQvCDQt9Cw0L/QuNGC0L7QvFxyXG4gICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICAgICAg0JfQsifRj9C20ZbRgtGM0YHRjyDQsdGD0LTRjCDQu9Cw0YHQutCwINC3INC90LDQvNC4INC00LvRjyDRg9GC0L7Rh9C90LXQvdC90Y8g0ZbQvdGE0L7RgNC80LDRhtGW0Zc6XHJcbiAgICAgICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgICAgICAke3Bob25lc31cclxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgIHByb2R1Y3RzUmVzdWx0cy5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgICAgICAgICBzaG93U2VhcmNoZWRSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJldlNlYXJjaFRleHQgPSBzZWFyY2hRdWVyeTsgICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlU2VhcmNoZWRSZXN1bHRzKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgcHJvZHVjdHNSZXN1bHRzLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gICAgfSwgNTAwKTtcclxufVxyXG5mdW5jdGlvbiBzaG93U2VhcmNoZWRSZXN1bHRzKCkge1xyXG4gICAgcHJvZHVjdHNSZXN1bHRzLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xyXG59XHJcblxyXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGRlYm91bmNlKHNlYXJjaFByb2R1Y3RIYW5kbGVyLCA4MDApKTtcclxuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGhpZGVTZWFyY2hlZFJlc3VsdHMpO1xyXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHNob3dTZWFyY2hlZFJlc3VsdHMpOyJdLCJuYW1lcyI6WyJkZWJvdW5jZSIsImZ1bmMiLCJ0aW1lb3V0IiwidGltZXIiLCJhcmdzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImFwcGx5IiwibnVtYmVyV2l0aENvbW1hcyIsIngiLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJQcm9kdWN0UXR5SW5wdXQiLCJjb25zdHJ1Y3RvciIsInByb2R1Y3RfcXR5X2lucHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkX3RvX2NhcnRfY29udGFpbmVyIiwiYmluZEV2ZW50TGlzdGVuZXJzIiwiY2hhbmdlUHJvZHVjdFF1YW50aXR5IiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJiaW5kIiwic2VhcmNoSW5wdXQiLCJwcm9kdWN0c1Jlc3VsdHMiLCJwaG9uZXMiLCJkYXRhc2V0Iiwic3BsaXQiLCJtYXAiLCJubWIiLCJqb2luIiwicHJldlNlYXJjaFRleHQiLCJzZWFyY2hQcm9kdWN0SGFuZGxlciIsInNlYXJjaFF1ZXJ5IiwidHJpbSIsImlubmVySFRNTCIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJyZXN1bHRzIiwiY29udGVudCIsImxlbmd0aCIsImdldF9hYnNvbHV0ZV91cmwiLCJ0aXRsZSIsInF1ZXJ5IiwiUmVnRXhwIiwidGl0bGVDb250ZW50IiwidG9Mb3dlckNhc2UiLCJzaG93U2VhcmNoZWRSZXN1bHRzIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJoaWRlU2VhcmNoZWRSZXN1bHRzIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIl0sInNvdXJjZVJvb3QiOiIifQ==