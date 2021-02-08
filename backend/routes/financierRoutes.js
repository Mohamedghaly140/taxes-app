const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

// import controllers
const {
	getFinanciers,
	getFinancierById,
	createFinancier,
	updateFinancierById,
	deleteFinancierById,
	getFinanciersByUserId,
} = require('../controllers/financierController'); // Financier Controllers
const auth = require('../middleware/auth');

router.get('/', getFinanciers);

router.get('/user/:uid', auth, getFinanciersByUserId);

router.get('/:fid', auth, getFinancierById);

router.post(
	'/',
	auth,
	[
		body('name', 'name is required').not().isEmpty(),
		body('userName', 'userName is required').not().isEmpty(),
		body('phone', 'phone is required').not().isEmpty(),
		body('attorneyNum', 'attorneyNum is required').not().isEmpty(),
		body('email', 'email is required').not().isEmpty().normalizeEmail(),
		body('nationalID', 'nationalID is required')
			.not()
			.isEmpty()
			.isNumeric()
			.matches(/^[0-9]{14}$/),
		body('password', 'password is required')
			.not()
			.isEmpty()
			.isLength({ min: 6 }),
		body('fileNum', 'fileNum is required').not().isEmpty(),
		body('TaxRegistrationNum', 'TaxRegistrationNum is required')
			.not()
			.isEmpty(),
	],
	createFinancier
);

router.put(
	'/:fid',
	auth,
	[
		body('name', 'name is required').not().isEmpty(),
		body('userName', 'userName is required').not().isEmpty(),
		body('phone', 'phone is required').not().isEmpty(),
		body('attorneyNum', 'attorneyNum is required').not().isEmpty(),
		body('email', 'email is required')
			.not()
			.isEmpty()
			.normalizeEmail()
			.isEmail(),
		body('nationalID', 'nationalID is required').not().isEmpty().isNumeric(),
		body('password', 'password is required')
			.not()
			.isEmpty()
			.isLength({ min: 6 }),
		body('fileNum', 'fileNum is required').not().isEmpty(),
		body('TaxRegistrationNum', 'TaxRegistrationNum is required')
			.not()
			.isEmpty(),
	],
	updateFinancierById
);

router.delete('/:fid', auth, deleteFinancierById);

module.exports = router;
