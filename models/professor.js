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
					if (professor.attributes.id) {
						throw new Error('The ID field cannot be updated');
					}
				},
				beforeCreate: (professor, options) => {
					if (professor.dataValues.id) {
						throw new Error(
							'Professors ID field is automatically generated'
						);
					}
				},
				afterFind: (professor, options) => {
					// Error if user does not exist
					if (!professor) {
						throw new Error(
							'Professors with that ID field does not exist'
						);
					}
				},
			},
		}
	);

	return Professor;
};
