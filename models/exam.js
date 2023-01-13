'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Exam extends Model {
		static associate(models) {
			Exam.belongsTo(models.Result);
			models.Result.hasMany(Exam);
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
