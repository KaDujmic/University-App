'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Exam extends Model {
		static associate(models) {
			models.Result.hasMany(Exam, {
				foreignKey: {
					name: 'examId',
				},
			});
			Exam.belongsTo(models.Result, {
				foreignKey: {
					name: 'id',
				},
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
		}
	);
	return Exam;
};
