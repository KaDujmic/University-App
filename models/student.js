'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Student extends Model {
		static associate(models) {
			Student.belongsTo(models.major);
			models.major.hasMany(Student);
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
