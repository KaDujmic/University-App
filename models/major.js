'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Major extends Model {
		static associate(models) {
			models.Department.hasMany(Major, {
				foreignKey: {
					name: 'departmentId',
				},
			});
			Major.belongsTo(models.Department, {
				foreignKey: {
					name: 'id',
				},
			});
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
