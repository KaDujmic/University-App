'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');
const { ValidationError } = require('../utils/errorHandler');

module.exports = (sequelize, DataTypes) => {
	class Professor extends Model {
		static associate(models) {
			models.Department.hasMany(Professor, {
				foreignKey: {
					name: 'department_id',
				},
			});
			Professor.belongsTo(models.Department, {
				foreignKey: {
					name: 'id',
				},
			});

			Professor.belongsToMany(models.Course, {
				through: models.ProfessorCourse,
				foreignKey: 'professor_id',
			});
		}
	}
	Professor.init(
		{
			full_name: DataTypes.STRING,
			address: DataTypes.STRING,
			phone_number: DataTypes.STRING,
			department_id: DataTypes.INTEGER,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			role: DataTypes.STRING,
		},
		{
			sequelize,
			underscored: true,
			modelName: 'Professor',
			tableName: 'professor',
			hooks: {
				beforeBulkUpdate: (professor, options) => {
					Hook.isUpdateId(professor, options);
				},
				beforeCreate: async (professor, options) => {
					Hook.createUUID(professor, options);

					if (
						await Hook.userEmailCheck(
							sequelize,
							professor.dataValues.email
						)
					) {
						throw new ValidationError(
							'User with that email exists, please use different email!'
						);
					}

					if (await Hook.isEmailCorrect(professor, options)) {
						throw new ValidationError(
							'Email format is incorrect, please use different email format!'
						);
					}
				},
				afterCreate: (professor, options) => {
					Hook.hashPassword(professor, options);
				},
				afterFind: (professor, options) => {
					Hook.exists(professor, options);
					Hook.removePassword(professor, options);
				},
			},
		}
	);

	return Professor;
};
