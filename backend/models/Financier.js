const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const FinancierSchema = new Schema({
	name: {
		type: String,
		required: [true, 'name is required'],
	},
	userName: {
		type: String,
		required: [true, 'userName is required'],
		match: [/^[0-9]{9}_[0]{1}$/],
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'email is required'],
	},
	nationalID: {
		type: Number,
		unique: true,
		required: [true, 'national ID is required'],
		match: [/^[0-9]{14}$/],
	},
	password: {
		type: String,
		required: [true, 'password is required'],
		minlength: [6, 'Please enter password min length is 6'],
	},
	fileNum: {
		type: String,
		required: [true, 'file number is required'],
	},
	TaxRegistrationNum: {
		type: String,
		required: [true, 'file number is required'],
		match: [/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/],
	},
	registered: {
		type: Boolean,
		default: false,
	},
});

FinancierSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Financier', UserSchema);
