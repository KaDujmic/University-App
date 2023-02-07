'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');
const schemas = require('../utils/validationSchemas');

module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    static associate (models) {
      Result.belongsTo(models.Student, {
        foreignKey: 'student_id'
      });

      Result.belongsTo(models.Exam, {
        foreignKey: 'exam_id'
      });
    }
  }
  Result.init(
    {
      student_id: DataTypes.UUID,
      exam_id: DataTypes.UUID,
      grade: DataTypes.INTEGER
    },
    {
      sequelize,
      underscored: true,
      modelName: 'Result',
      tableName: 'result',
      hooks: {
        beforeBulkUpdate: async (result, options) => {
          await Hook.resultBeforeEditExists(sequelize, result, options);
        },
        beforeCreate: async (result, options) => {
          schemas.validation(
            schemas.resultSchema,
            result.dataValues
          );
        },
        afterFind: async (result, options) => {
          Hook.exists(result, options);
          Hook.removePasswordStudent(result);
        },
        beforeBulkDestroy: async (result, options) => {
          await Hook.resultBeforeEditExists(sequelize, result, options);
        }
      }
    }
  );
  return Result;
};
