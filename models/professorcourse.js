'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');
module.exports = (sequelize, DataTypes) => {
  class ProfessorCourse extends Model {
    static associate (models) {
      ProfessorCourse.belongsTo(models.Professor, {
        foreignKey: 'professor_id'
      });

      ProfessorCourse.belongsTo(models.Course, {
        foreignKey: 'course_id'
      });
    }
  }
  ProfessorCourse.init(
    {
      professor_id: DataTypes.UUID,
      course_id: DataTypes.UUID
    },
    {
      sequelize,
      underscored: true,
      modelName: 'ProfessorCourse',
      tableName: 'professor_course',
      hooks: {
        afterFind: async (professor_course, options) => {
          Hook.exists(professor_course, options);
          Hook.removePasswordProfessor(professor_course);
        }
      }
    }
  );
  return ProfessorCourse;
};
