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
			email: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Professor',
			hooks: {
				beforeBulkUpdate: (professor, options) => {
					console.log(professor.attributes.id);
					if (professor.attributes.id) {
						throw new Error('The ID field cannot be updated');
					}
				},
				beforeCreate: (professor, options) => {
					console.log(professor.dataValues.id);
					if (professor.dataValues.id) {
						throw new Error('Professors ID field is automatically generated');
					}
				},
			},
		}
	);

	// Professor.beforeUpdate = (professor, options) => {
	// 	if (professor._changed.id) {
	// 		console.log(professor._changed.id);
	// 		throw new Error('The ID field cannot be updated');
	// 	}
	// };

	return Professor;

};
