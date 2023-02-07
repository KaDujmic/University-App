'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate (models) {
      Enrollment.belongsTo(models.Student, {
        foreignKey: 'student_id'
      });
      Enrollment.belongsTo(models.Course, {
        foreignKey: 'course_id'
      });
    }
  }
  Enrollment.init(
    {
      student_id: DataTypes.UUID,
      course_id: DataTypes.UUID
    },
    {
      sequelize,
      underscored: true,
      modelName: 'Enrollment',
      tableName: 'enrollment',
      hooks: {
        beforeBulkUpdate: async (enrollment, options) => {
          await Hook.enrollmentBeforeEditExists(sequelize, enrollment, options);
        },
        beforeCreate: async (enrollment, options) => {
          await Hook.enrollmentCheck(sequelize, enrollment, options);
        },
        afterFind: async (enrollment, options) => {
          Hook.exists(enrollment, options);
          Hook.removePasswordStudent(enrollment);
        },
        beforeBulkDestroy: async (enrollment, options) => {
          await Hook.enrollmentBeforeEditExists(sequelize, enrollment, options);
        }
      }
    }
  );
  return Enrollment;
};
