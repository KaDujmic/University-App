'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Professor extends Model {
		static associate(models) {
			Professor.belongsTo(models.department);
			models.department.hasMany(Professor);
		}
	}
	Professor.init(
		{
			name: DataTypes.STRING,
			address: DataTypes.STRING,
			phoneNumber: DataTypes.STRING,
			departmentId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Professor',
		}
	);
	return Professor;
};
