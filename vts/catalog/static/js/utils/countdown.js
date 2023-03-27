export function countdown(selector) {
	let timer, days, hours, minutes, seconds;
	const countdownTemplate = ({ days, hours, minutes, seconds }) => (
		`
			<div class='count'>${days}<span>дні</span></div>
			<div class='count'>${hours}<span>год.</span></div>
			<div class='count'>${minutes}<span>хв.</span></div>
			<div class='count'>${seconds}<span>сек.</span></div>
		`
	);
	const countdownContainers = document.querySelectorAll(selector);

	countdownContainers.forEach(countdownContainer => {
		console.log(countdownContainer.dataset);
		const date_value = countdownContainer.dataset.endDate;
		const dateEnd = new Date(date_value).getTime();
	
		if ( isNaN(dateEnd) ) {
			return;
		}
	
		timer = setInterval(calculate, 1000);
	
		function calculate() {
			let dateStartInit = new Date();
			let dateStart = new Date(
				dateStartInit.getUTCFullYear(),
				dateStartInit.getUTCMonth(),
				dateStartInit.getUTCDate(),
				dateStartInit.getUTCHours(),
				dateStartInit.getUTCMinutes(),
				dateStartInit.getUTCSeconds()
			);
			let timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)
		
			if ( timeRemaining >= 0 ) {
				days    = parseInt(timeRemaining / 86400);
				timeRemaining   = (timeRemaining % 86400);
				hours   = parseInt(timeRemaining / 3600);
				timeRemaining   = (timeRemaining % 3600);
				minutes = parseInt(timeRemaining / 60);
				timeRemaining   = (timeRemaining % 60);
				seconds = parseInt(timeRemaining);
				countdownContainer.innerHTML = countdownTemplate({
					days: parseInt(days, 10),
					hours: ('0' + hours).slice(-2),
					minutes: ('0' + minutes).slice(-2),
					seconds: ('0' + seconds).slice(-2)
				});
			} else {
				clearInterval(timer);
				return;
			}
		}
	});
};
  