'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Major extends Model {
		static associate(models) {
			Major.belongsTo(models.department);
			models.department.hasMany(Major);
		}
	}
	Major.init(
		{
			name: DataTypes.STRING,
			departmentId: DataTypes.NUMBER,
		},
		{
			sequelize,
			modelName: 'Major',
		}
	);
	return Major;
};
