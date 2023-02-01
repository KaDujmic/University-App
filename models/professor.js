'use strict';
const { Model } = require('sequelize');
const Hook = require('../utils/hooks');
const schemas = require('../utils/validationSchemas');

module.exports = (sequelize, DataTypes) => {
  class Professor extends Model {
    static associate (models) {
      models.Department.hasMany(Professor, {
        foreignKey: {
          name: 'department_id'
        }
      });
      Professor.belongsTo(models.Department, {
        foreignKey: {
          name: 'id'
        }
      });

      Professor.belongsToMany(models.Course, {
        through: models.ProfessorCourse,
        foreignKey: 'professor_id'
      });
    }
  }
  Professor.init(
    {
      full_name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      department_id: DataTypes.UUID,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {
      sequelize,
      underscored: true,
      modelName: 'Professor',
      tableName: 'professor',
      hooks: {
        beforeBulkUpdate: async (professor, options) => {
          Hook.isUpdateId(professor, options);
          await Hook.existsOnUpdate(sequelize.models.Professor, professor.where.id, options);
        },
        beforeCreate: async (professor, options) => {
          schemas.validation(
            schemas.professorSchema,
            professor.dataValues
          );

          Hook.createUUID(professor, options);

          await Hook.userEmailCheck(
            sequelize,
            professor.dataValues.email
          );

          await Hook.isEmailCorrect(professor, options);
        },
        afterCreate: (professor, options) => {
          Hook.hashPassword(professor, options);
        },
        afterFind: (professor, options) => {
          Hook.exists(professor, options);
          Hook.removePassword(professor, options);
        },
        beforeBulkDestroy: async (professor, options) => {
          await Hook.existsOnUpdate(sequelize.models.Professor, professor.where.id, options);
        }
      }
    }
  );

  return Professor;
};
