import request from 'request';

const WEATHER_URL = 'http://api.weatherstack.com/current';
const WEATHER_ACCESS = '93751fe074068be9c2bc742f70adb5a9';

const forecast = (lat, lon, cb) => {
	const url =
		WEATHER_URL + '?access_key=' + WEATHER_ACCESS + '&query=' + lat + ',' + lon;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			cb('Unable to connect to weatherstack!', undefined);
		} else if (body.error) {
			cb(body.error.info, undefined);
		} else {
			cb(undefined, {
				temperature: body.current.temperature,
				feelslike: body.current.feelslike,
			});
		}
	});
};

export { forecast };
