import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
	faSearch,
	faBasketShopping,
	faCheck,
	faAngleUp,
	faAngleDoubleUp,
	faAngleDown,
	faAngleRight,
	faAngleLeft,
	faClose,
	faEye,
	faShoppingCart,
	faChevronLeft,
	faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

export const initFontAwesomeCommonIcons = () => {
	library.add(
		faSearch,
		faBasketShopping,
		faCheck,
		faAngleUp,
		faAngleDoubleUp,
		faAngleDown,
		faAngleRight,
		faAngleLeft,
		faFacebook,
		faClose,
		faEye,
		faShoppingCart,
		faChevronLeft,
		faChevronRight
	);
	dom.watch();
};
