'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');

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
			name: DataTypes.STRING,
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
					await Hook.createUUID(professor, options);

					const user = await sequelize.models.Student.findAll({
						where: { email: professor.dataValues.email },
					});
					if (user.length) {
						const error = new Error(
							'User with that email exists, please use different email!'
						);
						error.statusCode = 404;
						throw error;
					}
				},
				afterCreate: (professor, options) => {
					Hook.hashPassword(professor, options);
				},
				afterFind: (professor, options) => {
					Hook.exists(professor, options);
				},
			},
		}
	);

	return Professor;
};
