const request = require('supertest');
const models = require('../models');
const app = require('../app');
const { execSync } = require('child_process');

describe('Testing all auth validations', () => {
  beforeAll(async () => {
    execSync('npm run migrate:test');
    execSync('npm run seed:test');
  });

  afterAll(async () => {
    execSync('npm run undo:seed:test');
    execSync('npm run undo:migrate:test');
    await models.sequelize.close();
  });
  describe('Testing login route', () => {
    describe.each([
      [{ email: 'mike@example.com', password: 'test1234' }, 200],
      [{ email: 'miketest@example.com', password: 'test1234' }, 400],
      [{ email: 'mike@example.com', password: 'test124' }, 400]
    ])('Testing GET DEPARTMENT route with department id', (userBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).post('/login').send(userBody);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing professor route restriction', () => {
    describe.each([
      [{ email: 'mike@example.com', password: 'test1234' }, 200],
      [{ email: 'mike.louren@gmail.com', password: 'test1234' }, 403],
      [{ email: 'mike@example.com', password: 'test124' }, 400]
    ])('Testing GET DEPARTMENT route with department id', (userBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const login = await request(app).post('/login').send(userBody);
        const jwt = login._body.token;
        const response = await request(app).get('/professor').set('Authorization', `Bearer ${jwt}`);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
});
