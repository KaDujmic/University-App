'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');
const schemas = require('../utils/validationSchemas');

module.exports = (sequelize, DataTypes) => {
	class Exam extends Model {
		static associate(models) {
			models.Course.hasMany(Exam, {
				foreignKey: 'course_id',
			});

			Exam.belongsTo(models.Course, {
				foreignKey: 'id',
			});

			Exam.belongsToMany(models.Student, {
				through: models.Result,
				foreignKey: 'exam_id',
			});
		}
	}
	Exam.init(
		{
			name: DataTypes.STRING,
			date: DataTypes.DATE,
			time: DataTypes.TIME,
			course_id: DataTypes.UUID,
		},
		{
			sequelize,
			underscored: true,
			modelName: 'Exam',
			tableName: 'exam',
			hooks: {
				beforeBulkUpdate: (exam, options) => {
					Hook.isUpdateId(exam, options);
				},
				beforeCreate: (exam, options) => {
					schemas.validation(schemas.examSchema, exam.dataValues);
					Hook.createUUID(exam, options);
				},
				afterFind: (exam, options) => {
					// Error if user does not exist
					Hook.exists(exam, options);
				},
			},
		}
	);
	return Exam;
};
