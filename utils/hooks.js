const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

(exports.isUpdateId = (data, options) => {
	if (data.attributes.id) {
		throw new Error('The ID field cannot be updated');
	}
}),
	(exports.idIsPresent = (data, options) => {
		if (data.dataValues.id) {
			throw new Error('Model ID field is automatically generated');
		}
	}),
	(exports.exists = (data, options) => {
		// Error if user does not exist
		if (!data) {
			throw new Error('Model with that ID field does not exist');
		}
	});

exports.createUUID = (data, options) => {
	data.id = uuidv4();
};

exports.hashPassword = async (data, options) => {
	data.password = await bcrypt.hash(data.password, 2);
	console.log(data.password);
	return data.save();
};

exports.userEmailCheckStudent = async (sequelize, email) => {
	const user = await sequelize.models.Professor.findAll({
		where: { email: email },
	});
	if (user)
		throw new Error(
			'User with that email exists, please use different email!'
		);
};

exports.userEmailCheckProfessor = async (sequelize, email) => {
	const user = await sequelize.models.Student.findAll({
		where: { email: email },
	});
	if (user)
		throw new Error(
			'User with that email exists, please use different email!'
		);
};
