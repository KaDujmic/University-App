'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Enrollment extends Model {
		static associate(models) {
			Enrollment.belongsTo(models.student);
			models.student.hasMany(Enrollment);

			Enrollment.belongsTo(models.course);
			models.course.hasMany(Enrollment);
		}
	}
	Enrollment.init(
		{
			studentId: DataTypes.INTEGER,
			courseId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Enrollment',
		}
	);
	return Enrollment;
};
