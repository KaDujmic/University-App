const bcrypt = require('bcrypt');
const { ValidationError } = require('sequelize');
const { NotFoundError } = require('./errorHandler');
const { v4: uuidv4 } = require('uuid');

// Checking if the ID is being updated
exports.isUpdateId = (data, options) => {
	if (data.attributes.id) {
		throw new ValidationError('The ID field cannot be updated');
	}
};

// Checking if the ID is passed in the body
exports.idIsPresent = (data, options) => {
	if (data.dataValues.id) {
		throw new ValidationError(
			'Model ID field is automatically generated'
		);
	}
};

// Checking if the user exists e.g. afterFind hook for better error messages
exports.exists = (data, options) => {
	// Error if user does not exist
	if (!data) {
		throw new NotFoundError(
			'Model with that ID field does not exist'
		);
	}
};

// UUID creation
exports.createUUID = (data, options) => {
	data.id = uuidv4();
};

// Password hashing
exports.hashPassword = async (data, options) => {
	data.password = await bcrypt.hash(data.password, 2);
	return data.save();
};

// Check if there is another user with the same email
exports.userEmailCheck = async (sequelize, email) => {
	const user =
		(await sequelize.models.Student.findOne({
			where: { email: email },
			hooks: false,
		})) ||
		(await sequelize.models.Professor.findOne({
			where: { email: email },
			hooks: false,
		}));
	if (user) {
		return 1;
	}
	return 0;
};

// Remove password on find
exports.removePassword = async (data, options) => {
	return data.dataValues ? delete data.dataValues.password : 0;
};

// Check email format
exports.isEmailCorrect = async (data, options) => {
	if (
		!data.dataValues.email.match(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
	) {
		return 1;
	}
	return 0;
};
