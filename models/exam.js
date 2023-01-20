'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Exam extends Model {
		static associate(models) {
			models.Course.hasMany(Exam, {
				foreignKey: 'courseId',
			});

			Exam.belongsTo(models.Course, {
				foreignKey: 'id',
			});

			Exam.belongsToMany(models.Student, {
				through: models.Result,
				foreignKey: 'examId',
			});
		}
	}
	Exam.init(
		{
			name: DataTypes.STRING,
			date: DataTypes.DATE,
			time: DataTypes.TIME,
			courseId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Exam',
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
