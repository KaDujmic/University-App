'use strict';
const { Model } = require('sequelize');
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
					await Hook.createUUID(student, options);

					const user = await sequelize.models.Professor.findAll({
						where: { email: student.dataValues.email },
					});
					if (user.length) {
						const error = new Error(
							'User with that email exists, please use different email!'
						);
						error.statusCode = 404;
						throw error;
					}
				},
				afterFind: (student, options) => {
					// Error if user does not exist
					Hook.exists(student, options);
				},
			},
		}
	);
	return Student;
};
