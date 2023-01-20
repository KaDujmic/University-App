'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Course extends Model {
		static associate(models) {
			models.Major.hasMany(Course, {
				foreignKey: {
					name: 'majorId',
				},
			});
			Course.belongsTo(models.Major, {
				foreignKey: {
					name: 'id',
				},
			});

			Course.belongsToMany(models.Student, {
        through: models.Enrollment,
        foreignKey: 'courseId'
      })

			Course.belongsToMany(models.Professor, {
        through: models.ProfessorCourse,
        foreignKey: 'courseId'
      })
		}
	}
	Course.init(
		{
			name: DataTypes.STRING,
			creditHours: DataTypes.INTEGER,
			majorId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Course',
			hooks: {
				beforeBulkUpdate: (course, options) => {
					Hook.isUpdateId(course, options)
				},
				beforeCreate: (course, options) => {
					Hook.idIsPresent(course, options);
				},
				afterFind: (course, options) => {
					// Error if user does not exist
					Hook.exists(course, options)
				},
			},
		}
	);
	return Course;
};
