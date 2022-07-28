const locationForm = document.querySelector('form');
const inputEl = document.querySelector('input');
const messageTitle = document.querySelector('#message-title');
const messageText = document.querySelector('#message-text');

locationForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = inputEl.value;
	const requestUrl = 'http://localhost:3000/weather?location=' + location;

	fetch(requestUrl).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageTitle.innerHTML = data.error;
			} else {
				messageTitle.innerHTML = data.location;
				messageText.innerHTML = data.forecast;
			}
		});
	});
});
