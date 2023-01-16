'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Result extends Model {
		static associate(models) {
			models.Student.hasMany(Result, {
				foreignKey: {
					name: 'studentId',
				},
			});
			Result.belongsTo(models.Student, {
				foreignKey: {
					name: 'id',
				},
			});

			models.Exam.hasMany(Result, {
				foreignKey: {
					name: 'examId',
				},
			});
			Result.belongsTo(models.Exam, {
				foreignKey: {
					name: 'id',
				},
			});
		}
	}
	Result.init(
		{
			studentId: DataTypes.INTEGER,
			examId: DataTypes.INTEGER,
			grade: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Result',
		}
	);
	return Result;
};
