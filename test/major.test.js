const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { majorTest } = require('../testSeed/seed');
const { execSync } = require('child_process');
describe('Testing all MAJOR routes', () => {
  beforeAll(async () => {
    execSync('npm run migrate:test');
    execSync('npm run seed:test');
  });

  afterAll(async () => {
    execSync('npm run undo:seed:test');
    execSync('npm run undo:migrate:test');
    await models.sequelize.close();
  });
  describe('Testing all GET MAJOR routes', () => {
    test('Test wether the app returns 200 OK on a get request /major', async () => {
      const response = await request(app).get('/major');
      expect(response.statusCode).toBe(200);
    });
    describe.each([
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6c' }, 200],
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc64' }, 404],
      [{ id: 2 }, 500]
    ])('Testing GET MAJOR route with major id', (majorBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).get(`/major/${majorBody.id}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all POST MAJOR routes', () => {
    describe.each([
      [{ name: 'TestName', department_id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252' }, 201],
      [{ name: 'TestName' }, 400],
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e', name: 'TestName 2', department_id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252' }, 400]
    ])('Testing POST MAJOR route', (majorBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).post('/major').send(majorBody);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all PUT MAJOR routes', () => {
    describe.each([
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e' }, { name: 'TestName 2' }, 200],
      [{ id: '420ad58b-d4a2-4e71-9fa3-724759d8e7ec' }, { name: 'TestName' }, 500],
      // eslint-disable-next-line max-len
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6c' }, { id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e', name: 'TestName 2' }, 400]
    ])('Testing POST MAJOR route', (majorId, majorBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).put(`/major/${majorId.id}`).send(majorBody);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all DELETE MAJOR routes', () => {
    describe.each([
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6c' }, 204],
      [{ id: '420ad58b-d4a2-4e71-93a3-714759d8e7e3' }, 404],
      [{ id: 2 }, 500]
    ])('Testing DELETE MAJOR route', (majorId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).delete(`/major/${majorId.id}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing get STUDENTS MAJOR route', () => {
    describe.each([
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6c' }, 200],
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e' }, 404]
    ])('Testing GET MAJOR route', (majorId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).get(`/major/${majorId.id}/students`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
});
