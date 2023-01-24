'use strict';
const { Model } = require('sequelize');
const { ValidationError } = require('../utils/errorHandler');
const Hook = require('../utils/hooks');

module.exports = (sequelize, DataTypes) => {
	class Student extends Model {
		static associate(models) {
			models.Major.hasMany(Student, {
				foreignKey: {
					name: 'major_id',
				},
			});
			Student.belongsTo(models.Major, {
				foreignKey: {
					name: 'id',
				},
			});

			Student.belongsToMany(models.Course, {
				through: models.Enrollment,
				foreignKey: 'student_id',
			});

			Student.belongsToMany(models.Exam, {
				through: models.Result,
				foreignKey: 'student_id',
			});
		}
	}
	Student.init(
		{
			full_name: DataTypes.STRING,
			email: DataTypes.STRING,
			email: DataTypes.STRING,
			address: DataTypes.STRING,
			phone_number: DataTypes.STRING,
			major_id: DataTypes.INTEGER,
			password: DataTypes.STRING,
			role: DataTypes.STRING,
		},
		{
			sequelize,
			underscored: true,
			modelName: 'Student',
			tableName: 'student',
			hooks: {
				beforeBulkUpdate: (student, options) => {
					Hook.isUpdateId(student, options);
				},
				beforeCreate: async (student, options) => {
					Hook.createUUID(student, options);

					if (
						await Hook.userEmailCheck(
							sequelize,
							student.dataValues.email
						)
					) {
						throw new ValidationError(
							'User with that email exists, please use different email!'
						);
					}
					console.log(' \n No Email Duplicates !!! \n');

					if (await Hook.isEmailCorrect(student, options)) {
						throw new ValidationError(
							'Email format is incorrect, please use different email format!'
						);
					}

					console.log(
						`\n ${student.dataValues.email} is in the correct format \n`
					);
				},
				afterFind: (student, options) => {
					// Error if user does not exist
					Hook.exists(student, options);
					Hook.removePassword(student, options);
				},
			},
		}
	);
	return Student;
};
