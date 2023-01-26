'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');
const schemas = require('../utils/validationSchemas');

module.exports = (sequelize, DataTypes) => {
  class Major extends Model {
    static associate (models) {
      models.Department.hasMany(Major, {
        foreignKey: {
          name: 'department_id'
        }
      });
      Major.belongsTo(models.Department, {
        foreignKey: {
          name: 'id'
        }
      });
    }
  }
  Major.init(
    {
      name: DataTypes.STRING,
      department_id: DataTypes.UUID
    },
    {
      sequelize,
      underscored: true,
      modelName: 'Major',
      tableName: 'major',
      hooks: {
        beforeBulkUpdate: (major, options) => {
          Hook.isUpdateId(major, options);
        },
        beforeCreate: (major, options) => {
          schemas.validation(schemas.majorSchema, major.dataValues);

          Hook.createUUID(major, options);
        },
        afterFind: (major, options) => {
          // Error if user does not exist
          Hook.exists(major, options);
        }
      }
    }
  );
  return Major;
};
