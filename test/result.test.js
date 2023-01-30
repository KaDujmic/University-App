const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { resultTest } = require('../testSeed/seed');
const { execSync } = require('child_process');

describe('Testing all result routes', () => {
  beforeAll(async () => {
    execSync('npm run migrate:test');
    execSync('npm run seed:test');
  });

  afterAll(async () => {
    execSync('npm run undo:seed:test');
    execSync('npm run undo:migrate:test');
    await models.sequelize.close();
  });
  test('Test wether the app returns 200 OK on a get request /result', async () => {
    const response = await request(app).get('/result');
    expect(response.statusCode).toBe(200);
  });
  test('Test wether the app returns 200 OK on a get request /result/:student_id/:exam_id', async () => {
    const response = await request(app).get(
      '/result/f034675d-8d14-463f-a360-2e28345a212d/f0d0ea4d-0e40-4987-866e-154da59552c5'
    );
    expect(response.statusCode).toBe(200);
  });
  // eslint-disable-next-line max-len
  test('Test the app returns error with message "Model with that ID field does not exist" on a get request /result/:student_id/:exam_id', async () => {
    const response = await request(app).get(
      '/result/f034675d-8d14-463f-a360-2e28345a212d/fff3cb51-f73a-4fbd-985f-e76054e1a9ee'
    );
    expect(response._body.message).toMatch(
      'Model with that ID field does not exist'
    );
  });
  test('Test wether the app returns 201 Created on a post request /result', async () => {
    const body = {
      student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
      exam_id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea',
      grade: 3
  };
    const response = await request(app)
      .post('/result')
      .send(body)
      .expect('Content-Type', /json/);
    expect(response.statusCode).toBe(201);
  });
  test('Test wether the app returns 200 OK on a put request /result/:student_id/:exam_id', async () => {
    const result = await models.Result.findOne({
      where: {
      student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
      exam_id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea'
    }
    });
    const body = { grade: 5 };
    const response = await request(app)
      .put(`/result/${result.student_id}/${result.exam_id}`)
      .send(body);
    expect(response.statusCode).toBe(200);
  });
  test('Test the app returns 204 No Content on a delete request /result/:student_id/:exam_id', async () => {
    const result = await models.Result.findOne({
      where: {
      student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
      exam_id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea'
    }
    });
    const response = await request(app).delete(`/result/${result.student_id}/${result.exam_id}`);
    expect(response.statusCode).toBe(204);
  });
  afterAll(async () => {
    await models.sequelize.close();
  });
});
