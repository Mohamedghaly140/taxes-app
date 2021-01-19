// Load env vars
require('dotenv').config({ path: './.env' });
require('colors');

const express = require('express');
const morgan = require('morgan');
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

// import routes files
const financierRoutes = require('./routes/financierRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

// excute routes
app.use('/api/financier', financierRoutes);
app.use('/api/auth', usersRoutes);

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

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`);
});
