import request from 'request';

const WEATHER_URL = 'http://api.weatherstack.com/current';
const WEATHER_ACCESS = '93751fe074068be9c2bc742f70adb5a9';

const forecast = (latitude, longitude, cb) => {
	const query = '?' + 'access_key=' + WEATHER_ACCESS + '&' + 'query=' + latitude + ',' + longitude;
	const url = WEATHER_URL + query;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			cb('Error occured while connecting to weather service. Please, try again later.', undefined);
		} else if (body.error) {
			cb(body.error.info, undefined);
		} else {
			cb(undefined, {
				desc: body.current.weather_descriptions.join('. ') + '.',
				temp: body.current.temperature,
				precip: body.current.precip,
			});
		}
	});
};

export { forecast };
