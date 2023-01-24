const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

exports.isUpdateId = (data, options) => {
	if (data.attributes.id) {
		throw new Error('The ID field cannot be updated');
	}
};

exports.idIsPresent = (data, options) => {
	if (data.dataValues.id) {
		const error = new Error(
			'Model ID field is automatically generated'
		);
		error.statusCode = 404;
		throw error;
	}
};

exports.exists = (data, options) => {
	// Error if user does not exist
	if (!data) {
		const error = new Error(
			'Model with that ID field does not exist'
		);
		error.statusCode = 404;
		throw error;
	}
};

exports.createUUID = (data, options) => {
	data.id = uuidv4();
};

exports.hashPassword = async (data, options) => {
	data.password = await bcrypt.hash(data.password, 2);
	return data.save();
};

exports.userEmailCheckStudent = async (sequelize, email) => {
	const user = await sequelize.models.Professor.findAll({
		where: { email: email },
	});
	if (user) {
		const error = new Error(
			'User with that email exists, please use different email!'
		);
		error.statusCode = 404;
		throw error;
	}
};

exports.userEmailCheckProfessor = async (sequelize, email) => {
	const user = await sequelize.models.Student.findAll({
		where: { email: email },
	});
	if (user) {
		const error = new Error(
			'User with that email exists, please use different email!'
		);
		error.statusCode = 404;
		throw error;
	}
};

exports.removePassword = async (data, options) => {
	delete data.dataValues.password;
}
