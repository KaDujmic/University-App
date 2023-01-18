'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Exam extends Model {
		static associate(models) {
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
		}
	);
	return Exam;
};
