'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
    }
  }
  Department.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Department',
    hooks: {
      beforeBulkUpdate: (department, options) => {
        Hook.isUpdateId(department, options)
      },
      beforeCreate: (department, options) => {
        Hook.idIsPresent(department, options);
      },
      afterFind: (department, options) => {
        // Error if user does not exist
        Hook.exists(department, options)
      },
    },
  });
  return Department;
};