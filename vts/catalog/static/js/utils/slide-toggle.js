require('@styles/modules/slide-toggle/slide-toggle.scss');
export const slideToggle = ({
	selector,
	target_container_selector
}) => {
	const linkToggles = document.querySelectorAll(selector);
	const target_container = document.querySelector(target_container_selector);

	console.log(linkToggles);
	linkToggles.forEach(linkToggle => {
		linkToggle.addEventListener('click', function (event) {
			event.preventDefault();

			const container = target_container || document.getElementById(this.dataset.container);

			if (!container.classList.contains('active')) {
			
				this.classList.add('active');
				container.classList.add('active');
				container.style.height = 'auto';

				const height = container.clientHeight + 'px';

				container.style.height = '0px';

				setTimeout(() => container.style.height = height, 0);
			} else {
				container.style.height = '0px';

				this.classList.remove('active');
				container.addEventListener('transitionend', function () {
					container.classList.remove('active');
				}, {
					once: true
				});
			}
		});
	});
};
