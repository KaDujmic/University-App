const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { departmentTest } = require('./testSeed');
const { execSync } = require('child_process');

describe('Testing all DEPARTMENT routes', () => {
  beforeAll(async () => {
    execSync('npm run migrate:test');
    execSync('npm run seed:test');
  });

  afterAll(async () => {
    execSync('npm run undo:seed:test');
    execSync('npm run undo:migrate:test');
    await models.sequelize.close();
  });
  describe('Testing all GET DEPARTMENT routes', () => {
    test('Test wether the app returns 200 OK on a get request /department', async () => {
      const response = await request(app).get('/department');
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.statusCode).toBe(200);
    });
    describe.each([
      [{ id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252' }, 200],
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc64' }, 404],
      [{ id: 2 }, 500]
    ])('Testing GET DEPARTMENT route with department id', (departmentBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).get(`/department/${departmentBody.id}`);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all POST DEPARTMENT routes', () => {
    describe.each([
      [{ name: 'TestName' }, 201],
      [{ name: 'TestName' }, 500],
      [{ id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252', name: 'TestName 2' }, 400]
    ])('Testing POST DEPARTMENT route', (departmentBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).post('/department').send(departmentBody);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all PUT DEPARTMENT routes', () => {
    describe.each([
      [{ id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252' }, { name: 'TestName 2' }, 200],
      [{ id: '420ad58b-d4a2-4e71-9fa3-724759d8e7ec' }, { name: 'TestName' }, 404],
      // eslint-disable-next-line max-len
      [{ id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252' }, { id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e', name: 'TestName 2' }, 400]
    ])('Testing POST DEPARTMENT route', (departmentId, departmentBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).put(`/department/${departmentId.id}`).send(departmentBody);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all DELETE DEPARTMENT routes', () => {
    describe.each([
      [{ id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252' }, 204],
      [{ id: '420ad58b-d4a2-4e71-93a3-714759d8e7e3' }, 404],
      [{ id: 2 }, 500]
    ])('Testing DELETE DEPARTMENT route', (departmentId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).delete(`/department/${departmentId.id}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing get PROFESSORS ON DEPARTMENT route', () => {
    describe.each([
      [{ id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252' }, 200]
      // [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e' }, 404] TODO
    ])('Testing GET DEPARTMENT route', (departmentId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).get(`/department/${departmentId.id}/professors`);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
});
