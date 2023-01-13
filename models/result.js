'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Result extends Model {
		static associate(models) {
			Result.belongsTo(models.student);
			models.student.hasMany(Result);

			Result.belongsTo(models.exam);
			models.exam.hasMany(Result);
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
