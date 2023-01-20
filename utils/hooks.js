const bcrypt = require('bcrypt');

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

exports.hashPassword = async (data, options) => {
	data.password = await bcrypt.hash(data.password, 2);
	console.log(data.password);
	return data.save();
};
