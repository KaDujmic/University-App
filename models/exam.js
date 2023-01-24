'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');

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
			course_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			underscored: true,
			modelName: 'Exam',
			tableName: 'exam',
			hooks: {
				beforeBulkUpdate: (professor, options) => {
					Hook.isUpdateId(professor, options)
				},
				beforeCreate: (professor, options) => {
					Hook.idIsPresent(professor, options);
				},
				afterFind: (professor, options) => {
					// Error if user does not exist
					Hook.exists(professor, options)
				},
			},
		}
	);
	return Exam;
};
