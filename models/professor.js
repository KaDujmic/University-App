'use strict';
const { Model } = require('sequelize');
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
		},
		{
			sequelize,
			modelName: 'Professor',
		}
	);
	return Professor;
};
