import request from 'request';

const MAPBOX_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const MAPBOX_ACCESS =
	'pk.eyJ1IjoidmxhZGtvdmFhbCIsImEiOiJjbDV4NHE3c2swMGljM3JwMnd4eHFzaHByIn0.hb98iweCUBw3YS0jrFg3Hg';
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

const geocode = (location, cb) => {
	const locationUri = encodeURIComponent(location);
	const url = MAPBOX_URL + locationUri + '.json?access_token=' + MAPBOX_ACCESS;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			cb('Server connection error!', undefined);
		} else if (body.message) {
			cb(body.message, undefined);
		} else if (body.features.length === 0) {
			cb('No match found!', undefined);
		} else {
			cb(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

export { forecast, geocode };
