'use strict';
const { Model } = require('sequelize');
const Hooks = require('../utils/hooks');
const schemas = require('../utils/validationSchemas');

module.exports = (sequelize, DataTypes) => {
	class Result extends Model {
		static associate(models) {
			Result.belongsTo(models.Student, {
				foreignKey: 'student_id',
			});

			Result.belongsTo(models.Exam, {
				foreignKey: 'exam_id',
			});
		}
	}
	Result.init(
		{
			student_id: DataTypes.UUID,
			exam_id: DataTypes.UUID,
			grade: DataTypes.INTEGER,
		},
		{
			sequelize,
			underscored: true,
			modelName: 'Result',
			tableName: 'result',
			hooks: {
				beforeCreate: async (result, options) => {
					schemas.validation(
						schemas.professorSchema,
						student.dataValues
					);
				},
			},
		}
	);
	return Result;
};
