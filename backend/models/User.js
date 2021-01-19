const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'name is required'],
	},
	email: {
		type: String,
		required: [true, 'email is required'],
		unique: true,
	},
	password: {
		type: String,
		minlength: [6, 'Please enter password min length is 6'],
	},
	financiers: [
		{
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'Financier',
		},
	],
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
