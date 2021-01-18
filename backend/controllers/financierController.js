const { validationResult } = require('express-validator');

const HttpError = require('../models/HttpError');
const Financier = require('../models/Financier');

exports.getFinanciers = async (req, res, next) => {
	let financiers;

	try {
		financiers = await Financier.find();
	} catch (err) {
		return next(
			new HttpError('Fetching financiers failed, please try again later', 500)
		);
	}

	res.status(200).json({
		message: `find all financiers successfuly`,
		count: financiers.length,
		financiers: financiers.map(f => f.toObject({ getters: true })),
	});
};

exports.getPlaceById = async (req, res, next) => {
	const financierId = req.params.fid;

	let financier;

	try {
		financier = await Place.findById(financierId);

		if (!financier) {
			return next(
				new HttpError(
					`Could not find a financier for the provided id ${financierId}..`,
					404
				)
			);
		}
	} catch (err) {
		return next(
			new HttpError('Something went wrong, could not find a place', 500)
		);
	}

	res.status(200).json({
		message: `find successfuly financier with id ${financierId}`,
		financier: financier.toObject({ getters: true }),
	});
};