const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const FinancierSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'name is required'],
	},
	userName: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'user name is required'],
	},
	phone: {
		type: String,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		required: [true, 'email is required'],
		default: 'fake@fake-email.com',
	},
	nationalID: {
		type: Number,
		unique: true,
		trim: true,
		required: [true, 'national ID is required'],
		match: [/^[0-9]{14}$/],
	},
	password: {
		type: String,
		trim: true,
		minlength: [6, 'Please enter password min length is 6'],
	},
	fileNum: {
		type: String,
		trim: true,
		required: [true, 'file number is required'],
	},
	attorneyNum: {
		type: String,
		trim: true,
		required: [true, 'file number is required'],
	},
	TaxRegistrationNum: {
		type: String,
		trim: true,
		required: [true, 'file number is required'],
		match: [/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/],
	},
	registered: {
		type: Boolean,
		default: false,
	},
	addValue: {
		type: Boolean,
		default: false,
	},
	creator: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

FinancierSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Financier', FinancierSchema);
