const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { examTest } = require('../testSeed/seed');
const { execSync } = require('child_process');

describe('Testing all EXAM routes', () => {
  beforeAll(async () => {
    execSync('npm run migrate:test');
    execSync('npm run seed:test');
  });

  afterAll(async () => {
    execSync('npm run undo:seed:test');
    execSync('npm run undo:migrate:test');
    await models.sequelize.close();
  });
  describe('Testing all GET EXAM routes', () => {
    test('Test wether the app returns 200 OK on a get request /exam', async () => {
      const response = await request(app).get('/exam');
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.statusCode).toBe(200);
    });
    describe.each([
      [{ id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea' }, 200],
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc64' }, 404],
      [{ id: 2 }, 500]
    ])('Testing GET EXAM route with exam id', (examBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).get(`/exam/${examBody.id}`);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all POST EXAM routes', () => {
    describe.each([
      [
        {
          name: 'Chem 102 2nd exam',
          date: new Date(),
          time: new Date(),
          course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba',
          created_at: new Date(),
          updated_at: new Date()
        }, 201],
      [{ name: 'TestName' }, 400],
      [
        {
          id: 'fff3cb51-f73a-4fbd-985f-e76054e1a92a',
          name: 'Chem 102 3nd exam',
          date: new Date(),
          time: new Date(),
          course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba',
          created_at: new Date(),
          updated_at: new Date()
       }, 400]
    ])('Testing POST EXAM route', (examBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).post('/exam').send(examBody);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all PUT EXAM routes', () => {
    describe.each([
      [{ id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea' }, { name: 'TestName 2' }, 200],
      [{ id: '420ad58b-d4a2-4e71-9fa3-724759d8e7ec' }, { name: 'TestName' }, 404],
      // eslint-disable-next-line max-len
      [{ id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea' }, { id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e', name: 'TestName 2' }, 400]
    ])('Testing POST EXAM route', (examId, examBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).put(`/exam/${examId.id}`).send(examBody);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all DELETE EXAM routes', () => {
    describe.each([
      [{ id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea' }, 204],
      [{ id: '420ad58b-d4a2-4e71-93a3-714759d8e7e3' }, 404],
      [{ id: 2 }, 500]
    ])('Testing DELETE EXAM route', (examId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).delete(`/exam/${examId.id}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
});
