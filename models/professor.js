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
				beforeCreate: async (professor, options) => {
					await Hook.createUUID(professor, options);

					const user = await sequelize.models.Student.findAll({
						where: { email: professor.dataValues.email },
					});
					if (user.length)
						throw new Error(
							'User with that email exists, please use different email!'
						);
				},
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
