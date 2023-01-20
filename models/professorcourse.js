'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ProfessorCourse extends Model {
		static associate(models) {
			ProfessorCourse.belongsTo(models.Professor, {
				foreignKey: 'professorId',
			});

			ProfessorCourse.belongsTo(models.Course, {
				foreignKey: 'courseId',
			});
		}
	}
	ProfessorCourse.init(
		{
			professorId: DataTypes.UUID,
			courseId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'ProfessorCourse',
		}
	);
	return ProfessorCourse;
};
