'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Course extends Model {
		static associate(models) {
			models.Major.hasMany(Course, {
				foreignKey: {
					name: 'majorId',
				},
			});
			Course.belongsTo(models.Major, {
				foreignKey: {
					name: 'id',
				},
			});
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
