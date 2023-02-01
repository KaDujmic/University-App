const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { resultTest } = require('../testSeed/seed');
const { execSync } = require('child_process');

describe('Testing all RESULT routes', () => {
  beforeAll(async () => {
    execSync('npm run migrate:test');
    execSync('npm run seed:test');
  });

  afterAll(async () => {
    execSync('npm run undo:seed:test');
    execSync('npm run undo:migrate:test');
    await models.sequelize.close();
  });
  describe('Testing all GET RESULT routes', () => {
    test('Test wether the app returns 200 OK on a get request /result', async () => {
      const response = await request(app).get('/result');
      expect(response.statusCode).toBe(200);
    });
    describe.each([
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          exam_id: 'f0d0ea4d-0e40-4987-866e-154da59552c5'
        }, 200],
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          exam_id: 'f0d0ea4d-0e40-4987-866e-154dc59552c5'
        }, 404],
      [{ student_id: 2 }, 500]
    ])('Testing GET RESULT route with result id', (resultBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).get(`/result/${resultBody.student_id}/${resultBody.exam_id}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all POST RESULT routes', () => {
    describe.each([
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          exam_id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea',
          grade: 3
        }, 201
      ],
      [{ name: 'TestName' }, 400],
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          exam_id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea',
          grade: 3
        }, 500
      ]
    ])('Testing POST RESULT route', (resultBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).post('/result').send(resultBody);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all PUT RESULT routes', () => {
    describe.each([
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          exam_id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea'
        }, { grade: 2 }, 200]
      // eslint-disable-next-line max-len
      // [
      //   {
      //     student_id: 'f0d0ea4d-0e40-4987-866e-154da59552c5',
      //     exam_id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea'
      //   }, { student_id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e' }, 400] TODO ----~----
    ])('Testing PUT RESULT route', (resultId, resultBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).put(`/result/${resultId.student_id}/${resultId.exam_id}`).send(resultBody);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all DELETE RESULT routes', () => {
    describe.each([
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          exam_id: 'f0d0ea4d-0e40-4987-866e-154da59552c5'
        }, 204
      ],
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          exam_id: 'f0d0ea4d-0e40-4987-866e-154da59512c5'
        }, 404
      ],
      [{ id: 2 }, 500]
    ])('Testing DELETE RESULT route', (resultId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).delete(`/result/${resultId.student_id}/${resultId.exam_id}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
});
