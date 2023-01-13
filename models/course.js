'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Course extends Model {
		static associate(models) {
			Course.belongsTo(models.major);
			models.major.hasMany(Course);
		}
	}
	Course.init(
		{
			name: DataTypes.STRING,
			creditHours: DataTypes.INTEGER,
			orifessorId: DataTypes.INTEGER,
			majorId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Course',
		}
	);
	return Course;
};
