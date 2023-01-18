'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Student extends Model {
		static associate(models) {
			models.Major.hasMany(Student, {
				foreignKey: {
					name: 'majorId',
				},
			});
			Student.belongsTo(models.Major, {
				foreignKey: {
					name: 'id',
				},
			});

			Student.belongsToMany(models.Course, {
				through: models.Enrollment,
				foreignKey: 'studentId',
			});

			Student.belongsToMany(models.Exam, {
				through: models.Result,
				foreignKey: 'studentId',
			});
		}
	}
	Student.init(
		{
			fullName: DataTypes.STRING,
			email: DataTypes.STRING,
			email: DataTypes.STRING,
			address: DataTypes.STRING,
			phoneNumber: DataTypes.STRING,
			majorId: DataTypes.NUMBER,
		},
		{
			sequelize,
			modelName: 'Student',
		}
	);
	return Student;
};
