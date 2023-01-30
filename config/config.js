const envArg = process.argv.find(x => x.startsWith('dotenv')) || process.argv.find(x => x.startsWith('--env'));
const env = envArg ? envArg.split('=')[1] : ['development'];
require('dotenv').config({ path: `./.env.${env}` });

module.exports =
{
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
      underscored: true
    }
  },
  stage: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
      underscored: true
    }
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: 5433,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
      underscored: true
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
      underscored: true
    }
  }
};
