const locationForm = document.querySelector('form');
const inputEl = document.querySelector('input');
const messageTitle = document.querySelector('#message-title');
const messageText = document.querySelector('#message-text');

locationForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const requestUrl = '/weather?location=' + inputEl.value;

	fetch(requestUrl).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageTitle.innerHTML = data.error;
			} else {
				messageTitle.innerHTML = `<b>${data.location}</b>`;
				messageText.innerHTML = `<img src="${data.iconUrl}" id="icon">` + data.forecast;
			}
		});
	});
});
