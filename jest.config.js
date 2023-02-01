require('dotenv').config({
  path: '.env.test'
});

const config = {
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', { pageTitle: 'Test Report' }]
  ]
};

module.exports = config;
