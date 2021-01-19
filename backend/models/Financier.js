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
		trim: true,
		match: [/^[0-9]{9}_[0]{1}$/],
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		lowercase: true,
		required: [true, 'email is required'],
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
		required: [true, 'password is required'],
		minlength: [6, 'Please enter password min length is 6'],
	},
	fileNum: {
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
	creator: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

FinancierSchema.plugin(uniqueValidator);

FinancierSchema.pre('save', function (next) {
	const transformedTaxRegistrationNum = this.TaxRegistrationNum.split('-');
	this.userName = `${transformedTaxRegistrationNum[0]}${transformedTaxRegistrationNum[1]}${transformedTaxRegistrationNum[0]}_0`;
	next();
});

module.exports = mongoose.model('Financier', FinancierSchema);
// `${value.split('-')[0]}${value.split('-')[1]}${value.split('-')[0]}_0`
