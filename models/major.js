'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');

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
			hooks: {
				beforeBulkUpdate: (major, options) => {
					Hook.isUpdateId(major, options);
				},
				beforeCreate: (major, options) => {
					Hook.idIsPresent(major, options);
				},
				afterFind: (major, options) => {
					// Error if user does not exist
					Hook.exists(major, options);
				},
			},
		}
	);
	return Major;
};
