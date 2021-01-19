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

exports.getFinancierById = async (req, res, next) => {
	const financierId = req.params.fid;

	let financier;

	try {
		financier = await Financier.findById(financierId);

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
			new HttpError('Something went wrong, could not find a financier', 500)
		);
	}

	res.status(200).json({
		message: `find successfuly financier with id ${financierId}`,
		financier: financier.toObject({ getters: true }),
	});
};

exports.createFinancier = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let errMsg;

		errors.array().forEach(err => {
			errMsg = err.msg;
			// console.log(err.msg);
		});

		return next(
			new HttpError(
				`Invalid inputs passed, please check your data ${errMsg}`,
				422
			)
		);

		// return res.status(422).json({ errors: errors.array() });
	}

	const {
		name,
		email,
		nationalID,
		password,
		fileNum,
		TaxRegistrationNum,
		registered,
		// creator,
	} = req.body;

	const createdFinancier = new Financier({
		name,
		email,
		nationalID,
		password,
		fileNum,
		TaxRegistrationNum,
		registered,
		// creator,
	});

	// let user;

	// try {
	// 	user = await User.findById(creator);

	// 	if (!user) {
	// 		return next(
	// 			new HttpError(`Could not find user for the provided id.`, 404)
	// 		);
	// 	}
	// } catch (err) {
	// 	return next(new HttpError('Creating financier failed, try again later', 500));
	// }

	try {
		// const session = await mongoose.startSession();
		// session.startTransaction();
		// await createdFinancier.save({ session: session });
		// user.financiers.push(createdFinancier);
		// await user.save({ session: session });
		// await session.commitTransaction();
		await createdFinancier.save();
	} catch (err) {
		const error = new HttpError(
			'Creating financier faild, please try again',
			500
		);
		return next(error);
	}

	res.status(201).json({ financier: createdFinancier });
};

exports.updateFinancierById = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		next(new HttpError('Invalid inputs passed, please check your data', 422));
		// return res.status(400).json({ errors: errors.array() });
	}

	const financierId = req.params.fid;

	let updatedFinancier;

	try {
		updatedFinancier = await Financier.findById(financierId);

		if (!updatedFinancier) {
			return next(
				new HttpError(
					`Could not find any financier with the provided id ${placeId}`,
					404
				)
			);
		}
	} catch (err) {
		return next(
			new HttpError('Someting went wrong, could not update financier', 500)
		);
	}

	// if (updatedFinancier.creator.toString() !== req.userData.userId) {
	// 	return next(
	// 		new HttpError(
	// 			'You are not allowed to update this place No valid token, authorization is denied',
	// 			403
	// 		)
	// 	);
	// }

	updatedFinancier.name = req.body.name;
	updatedFinancier.email = req.body.email;
	updatedFinancier.nationalID = req.body.nationalID;
	updatedFinancier.password = req.body.password;
	updatedFinancier.fileNum = req.body.fileNum;
	updatedFinancier.TaxRegistrationNum = req.body.TaxRegistrationNum;
	updatedFinancier.registered = req.body.registered;

	try {
		updatedFinancier.save();
	} catch (err) {
		return next(
			new HttpError('Someting went wrong, could not update financier', 500)
		);
	}

	res.status(200).json({
		message: 'financier updated successfuly',
		financier: updatedFinancier,
	});
};

exports.deleteFinancierById = async (req, res, next) => {
	const financierId = req.params.fid;

	let financier;

	try {
		financier = await Financier.findById(financierId).populate('creator');

		// console.log(financier);

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
			new HttpError('Someting went wrong, could not delete financier', 500)
		);
	}

	// if (financier.creator.id !== req.userData.userId) {
	// 	return next(
	// 		new HttpError(
	// 			'You are not allowed to delete this financier No valid token, authorization is denied',
	// 			403
	// 		)
	// 	);
	// }

	// const imagePath = financier.image;

	try {
		// const session = await mongoose.startSession();
		// session.startTransaction();
		// await financier.remove({ session: session });
		// financier.creator.financiers.pull(financier);
		// await financier.creator.save({ session: session });
		// await session.commitTransaction();
		await financier.remove();
	} catch (err) {
		// console.log(err);
		return next(
			new HttpError(
				'Someting went wrong, could not delete financier relation',
				500
			)
		);
	}

	// fs.unlink(imagePath, err => console.log(err));

	res.status(200).json({
		message: 'financier deleted successfuly',
		financier,
	});
};
