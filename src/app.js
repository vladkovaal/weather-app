import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import hbs from 'hbs';
import { geocode } from '../utils/geocode.js';
import { forecast } from '../utils/forecast.js';

const srcPath = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.join(srcPath, '../');
const publicPath = path.join(rootPath, '/public');
const viewsPath = path.join(rootPath, '/templates/views');
const partialsPath = path.join(rootPath, '/templates/partials');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Vladyslav Kovalchuk',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Vladyslav Kovalchuk',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		message: 'This is some text to help',
		name: 'Vladyslav Kovalchuk',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.location) {
		return res.send({
			error: 'No address provided!',
		});
	}

	geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, { desc, temp, precip } = {}) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				location,
				forecast: `It's ${temp}C outside. ${desc} There's ${precip}% chance of rain.`,
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'No search term provided!',
		});
	}

	res.send({
		products: [],
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Help article not found!',
		name: 'Vladyslav Kovalchuk',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found!',
		name: 'Vladyslav Kovalchuk',
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});
