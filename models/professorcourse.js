'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ProfessorCourse extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			ProfessorCourse.belongsTo(models.professor);
			models.professor.hasMany(ProfessorCourse);

			ProfessorCourse.belongsTo(models.course);
			models.course.hasMany(ProfessorCourse);
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
