export const scrollUp = btn_selector => {
	const scrollBtn = document.querySelector(btn_selector);
	const btnVisibility = () => {
		if (scrollBtn) {
			if (window.scrollY > 400) {
				scrollBtn.style.display = 'block';
			} else {
				scrollBtn.style.display = 'none';
			}
		}
	};
	if (scrollBtn) {
		scrollBtn.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}

	document.addEventListener('scroll', () => {
		btnVisibility();
	});
	document.dispatchEvent(new CustomEvent('scroll'));
};
