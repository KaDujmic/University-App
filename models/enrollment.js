'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Enrollment extends Model {
		static associate(models) {
      Enrollment.belongsTo(models.Student, { foreignKey: 'studentId' })
      Enrollment.belongsTo(models.Course, { foreignKey: 'courseId' })
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
