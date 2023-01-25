'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');

module.exports = (sequelize, DataTypes) => {
	class Department extends Model {
		static associate(models) {}
	}
	Department.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			underscored: true,
			modelName: 'Department',
			tableName: 'department',
			hooks: {
				beforeBulkUpdate: (department, options) => {
					Hook.isUpdateId(department, options);
				},
				beforeCreate: (department, options) => {
					Hook.idIsPresent(department, options);
					Hook.createUUID(department, options);
				},
				afterFind: (department, options) => {
					// Error if user does not exist
					Hook.exists(department, options);
				},
			},
		}
	);
	return Department;
};
