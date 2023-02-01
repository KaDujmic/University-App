/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const { ValidationError } = require('./errorHandler');
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

exports.existsOnUpdate = async (sequelize, data, options) => {
  await sequelize.findOne({ where: { id: data } });
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
		  where: { email },
		  hooks: false
		})) ||
		(await sequelize.models.Professor.findOne({
		  where: { email },
		  hooks: false
		}));
  if (user) {
    throw new ValidationError(
      'User with that email exists, please use different email!'
    );
  }
  return 0;
};

// Remove password on find
exports.removePassword = (data, options) => {
  if (Array.isArray(data)) {
    data.forEach((item) => {
      delete item.dataValues.password;
    });
  } else if (data.dataValues.password) {
    delete data.dataValues.password;
  } else {
    return 0;
  }
};

// Check email format
exports.isEmailCorrect = async (data, options) => {
  if (
    !data.dataValues.email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    throw new ValidationError(
      'Email format is incorrect, please use different email format!'
    );
  }
  return 0;
};

// When creating a new enrollment check if both student and course exist
exports.enrollmentCheck = async (sequelize, data, options) => {
  if (
    !(await sequelize.models.Course.findOne({
      where: { id: data.dataValues.course_id },
      hooks: false
    }))
  ) {
    throw new ValidationError(
      'Course with that ID does not exist, please try again!'
    );
  } else if (
    !(await sequelize.models.Student.findOne({
      where: { id: data.dataValues.student_id },
      hooks: false
    }))
  ) {
    throw new ValidationError(
      'Student with that ID does not exist, please try again!'
    );
  }
};
