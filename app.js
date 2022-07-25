import { forecast, geocode } from './utils.js';

const location = process.argv.slice(2).join(' ');

if (!location) {
	console.log('No address provided');
} else {
	geocode(location, (geoError, { latitude, longitude, location } = {}) => {
		if (geoError) {
			return console.log(geoError);
		}

		forecast(latitude, longitude, (error, data) => {
			if (error) {
				console.log(error);
			}

			return console.log(data);
		});
	});
}
