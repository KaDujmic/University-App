'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');
const schemas = require('../utils/validationSchemas');

module.exports = (sequelize, DataTypes) => {
	class Course extends Model {
		static associate(models) {
			models.Major.hasMany(Course, {
				foreignKey: {
					name: 'major_id',
				},
			});
			Course.belongsTo(models.Major, {
				foreignKey: {
					name: 'id',
				},
			});

			Course.belongsToMany(models.Student, {
				through: models.Enrollment,
				foreignKey: 'course_id',
			});

			Course.belongsToMany(models.Professor, {
				through: models.ProfessorCourse,
				foreignKey: 'course_id',
			});
		}
	}
	Course.init(
		{
			name: DataTypes.STRING,
			credit_hours: DataTypes.INTEGER,
			major_id: DataTypes.UUID,
		},
		{
			sequelize,
			underscored: true,
			modelName: 'Course',
			tableName: 'course',
			hooks: {
				beforeBulkUpdate: (course, options) => {
					Hook.isUpdateId(course, options);
				},
				beforeCreate: (course, options) => {
					schemas.validation(schemas.courseSchema, course.dataValues);
					Hook.createUUID(course, options);
				},
				afterFind: (course, options) => {
					// Error if user does not exist
					Hook.exists(course, options);
				},
			},
		}
	);
	return Course;
};
