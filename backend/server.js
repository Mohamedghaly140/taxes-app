// Load env vars
require('dotenv').config({ path: './config/config.env' });

const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./db/db');
const HttpError = require('./models/HttpError');

// Connect to database
connectDB();

const app = express();

// body parser middleware
app.use(express.json({ extended: false }));

// Dev Logging Middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use((error, req, res, next) => {
	// if (req.file) {
	// 	fs.unlink(req.file.path, err => {
	// 		console.log(err);
	// 	});
	// }
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500).json({
		message: error.message || 'An unknown error occured! Server Error',
	});
});

const PORT = process.env.PORT;

app.listen(5000, () => {
	console.log(`Server listening on port ${PORT}!`);
});
