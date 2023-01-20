'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');

module.exports = (sequelize, DataTypes) => {
	class Professor extends Model {
		static associate(models) {
			models.Department.hasMany(Professor, {
				foreignKey: {
					name: 'departmentId',
				},
			});
			Professor.belongsTo(models.Department, {
				foreignKey: {
					name: 'id',
				},
			});

			Professor.belongsToMany(models.Course, {
				through: models.ProfessorCourse,
				foreignKey: 'professorId',
			});
		}
	}
	Professor.init(
		{
			name: DataTypes.STRING,
			address: DataTypes.STRING,
			phoneNumber: DataTypes.STRING,
			departmentId: DataTypes.INTEGER,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			role: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Professor',
			hooks: {
				beforeBulkUpdate: (professor, options) => {
					Hook.isUpdateId(professor, options);
				},
				// beforeCreate: (professor, options) => {
				// 	Hook.idIsPresent(professor, options);
				// },
				afterCreate: (professor, options) => {
					Hook.hashPassword(professor, options);
				},
				// afterFind: (professor, options) => {
				// 	// Error if user does not exist
				// 	Hook.exists(professor, options)
				// },
			},
		}
	);

	return Professor;
};
