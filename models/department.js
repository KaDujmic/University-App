'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');
const schemas = require('../utils/validationSchemas');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate (models) {}
  }
  Department.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      underscored: true,
      modelName: 'Department',
      tableName: 'department',
      hooks: {
        beforeBulkUpdate: async (department, options) => {
          await Hook.isUpdateId(department, options);
          await Hook.existsOnUpdate(sequelize.models.Department, department.where.id, options);
        },
        beforeCreate: (department, options) => {
          schemas.validation(
            schemas.departmentSchema,
            department.dataValues
          );
          Hook.createUUID(department, options);
        },
        afterFind: (department, options) => {
          // Error if user does not exist
          Hook.exists(department, options);
        },
        beforeBulkDestroy: async (department, options) => {
          await Hook.existsOnUpdate(sequelize.models.Department, department.where.id, options);
        }
      }
    }
  );
  return Department;
};
