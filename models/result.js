'use strict';
const { Model } = require('sequelize');
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
			exam_id: DataTypes.INTEGER,
			grade: DataTypes.INTEGER,
		},
		{
			sequelize,
			underscored: true,
			modelName: 'Result',
			tableName: 'result',
		}
	);
	return Result;
};
