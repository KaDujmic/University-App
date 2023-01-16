'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ProfessorCourse extends Model {
		static associate(models) {
			models.Professor.hasMany(ProfessorCourse, {
				foreignKey: {
					name: 'professorId',
				},
			});
			ProfessorCourse.belongsTo(models.Professor, {
				foreignKey: {
					name: 'id',
				},
			});

			models.Course.hasMany(ProfessorCourse, {
				foreignKey: {
					name: 'courseId',
				},
			});
			ProfessorCourse.belongsTo(models.Course, {
				foreignKey: {
					name: 'id',
				},
			});
		}
	}
	ProfessorCourse.init(
		{
			professorId: DataTypes.INTEGER,
			courseId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'ProfessorCourse',
		}
	);
	return ProfessorCourse;
};
