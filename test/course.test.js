const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { courseTest } = require('../testSeed/seed');
const { execSync } = require('child_process');

describe('Testing all COURSE routes', () => {
  beforeAll(async () => {
    execSync('npm run migrate:test');
    execSync('npm run seed:test');
  });

  afterAll(async () => {
    execSync('npm run undo:seed:test');
    execSync('npm run undo:migrate:test');
    await models.sequelize.close();
  });
  describe('Testing all GET COURSE routes', () => {
    test('Test wether the app returns 200 OK on a get request /course', async () => {
      const response = await request(app).get('/course');
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.statusCode).toBe(200);
    });
    describe.each([
      [{ id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd' }, 200],
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc64' }, 404],
      [{ id: 2 }, 500]
    ])('Testing GET COURSE route with course id', (courseBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).get(`/course/${courseBody.id}`);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all POST COURSE routes', () => {
    describe.each([
      [
        {
          name: 'Chem 103',
          credit_hours: 7,
          major_id: '420ad58b-d4a2-4e71-9fa3-724759d8e7ec',
          created_at: new Date(),
          updated_at: new Date()
        }, 201],
      [{ name: 'TestName' }, 400],
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e', name: 'TestName 2', major_id: '420ad58b-d4a2-4e71-9fa3-724759d8e7ec' }, 400]
    ])('Testing POST COURSE route', (courseBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).post('/course').send(courseBody);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all PUT COURSE routes', () => {
    describe.each([
      [{ id: 'edfe47ef-c998-4c29-8800-b3abbf152eba' }, { name: 'TestName 2' }, 200],
      [{ id: 'edfe47ef-c998-4c29-8800-b3abbf152eb3' }, { name: 'TestName' }, 404],
      // eslint-disable-next-line max-len
      [{ id: 'edfe47ef-c998-4c29-8800-b3abbf152eba' }, { id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e', name: 'TestName 2' }, 400]
    ])('Testing POST COURSE route', (courseId, courseBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).put(`/course/${courseId.id}`).send(courseBody);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all DELETE COURSE routes', () => {
    describe.each([
      [{ id: 'edfe47ef-c998-4c29-8800-b3abbf152eba' }, 204],
      [{ id: '420ad58b-d4a2-4e71-93a3-714759d8e7e3' }, 404],
      [{ id: 2 }, 500]
    ])('Testing DELETE COURSE route', (courseId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).delete(`/course/${courseId.id}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing get PROFESSORS on COURSE route', () => {
    describe.each([
      [{ id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd' }, 200]
      // [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e' }, 404] TODO
    ])('Testing GET COURSE route', (courseId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).get(`/course/${courseId.id}/professors`);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
});
