'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Result extends Model {
		static associate(models) {
			Result.belongsTo(models.Student, {
				foreignKey: 'studentId',
			});

			Result.belongsTo(models.Exam, {
				foreignKey: 'examId',
			});
		}
	}
	Result.init(
		{
			studentId: DataTypes.UUID,
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
