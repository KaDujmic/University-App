'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Enrollment extends Model {
		static associate(models) {
			Enrollment.belongsTo(models.Student, {
				foreignKey: 'student_id',
			});
			Enrollment.belongsTo(models.Course, {
				foreignKey: 'course_id',
			});
		}
	}
	Enrollment.init(
		{
			student_id: DataTypes.UUID,
			course_id: DataTypes.UUID,
		},
		{
			sequelize,
			underscored: true,
			modelName: 'Enrollment',
			tableName: 'enrollment',
		}
	);
	return Enrollment;
};
