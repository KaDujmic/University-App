'use strict';
const { Model } = require('sequelize');
const schemas = require('../utils/validationSchemas');
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
			major_id: DataTypes.UUID,
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
					schemas.validation(
						schemas.studentSchema,
						student.dataValues
					);

					Hook.createUUID(student, options);

					await Hook.userEmailCheck(
						sequelize,
						student.dataValues.email
					);

					await Hook.isEmailCorrect(student, options);
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
