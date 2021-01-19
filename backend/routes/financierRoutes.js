const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

// import controllers
const {
	getFinanciers,
	getFinancierById,
	createFinancier,
} = require('../controllers/financierController'); // Financier Controllers

router.get('/', getFinanciers);

router.get('/:fid', getFinancierById);

router.post(
	'/',
	[
		body('name', 'name is required').not().isEmpty(),
		body('userName', 'userName is required').not().isEmpty(),
		body('email', 'email is required').not().isEmpty().isEmail(),
		body('nationalID', 'nationalID is required')
			.not()
			.isEmpty()
			.isNumeric()
			.matches(/^[0-9]{14}$/),
		body('password', 'password is required').not().isEmpty(),
		body('fileNum', 'fileNum is required').not().isEmpty(),
		body('TaxRegistrationNum', 'TaxRegistrationNum is required')
			.not()
			.isEmpty(),
		body('registered', 'registered is required').not().isEmpty().isBoolean(),
	],
	createFinancier
);

// router.put(
// 	'/:fid',
// 	auth,
// 	[
// 		body('name', 'name is required').not().isEmpty(),
// 		body('userName', 'userName is required').not().isEmpty(),
// 		body('email', 'email is required').not().isEmpty().isEmail(),
// 		body('nationalID', 'nationalID is required').not().isEmpty().isNumeric(),
// 		body('password', 'password is required').not().isEmpty(),
// 		body('fileNum', 'fileNum is required').not().isEmpty(),
// 		body('TaxRegistrationNum', 'TaxRegistrationNum is required')
// 			.not()
// 			.isEmpty(),
// 		body('registered', 'registered is required').not().isEmpty().isBoolean(),
// 	],
// 	updatePlaceById
// );

// router.delete('/:fid', auth, deletePlaceById);

module.exports = router;
