'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Enrollment extends Model {
		static associate(models) {
			models.Student.hasMany(Enrollment, {
				foreignKey: {
					name: 'studentId',
				},
			});
			Enrollment.belongsTo(models.Student, {
				foreignKey: {
					name: 'id',
				},
			});

			models.Course.hasMany(Enrollment, {
				foreignKey: {
					name: 'courseId',
				},
			});
			Enrollment.belongsTo(models.Course, {
				foreignKey: {
					name: 'id',
				},
			});
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
