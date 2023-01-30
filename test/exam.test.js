const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { examTest } = require('../testSeed/seed');
const { execSync } = require('child_process');

describe('Testing all exam routes', () => {
  beforeAll(async () => {
    execSync('npm run migrate:test');
    execSync('npm run seed:test');
  });

  afterAll(async () => {
    execSync('npm run undo:seed:test');
    execSync('npm run undo:migrate:test');
    await models.sequelize.close();
  });
  test('Test wether the app returns 200 OK on a get request /exam', async () => {
    const response = await request(app).get('/exam');
    expect(response.statusCode).toBe(200);
  });
  test('Test wether the app returns 200 OK on a get request /exam/:id', async () => {
    const response = await request(app).get(
      '/exam/fff3cb51-f73a-4fbd-985f-e76054e1a9ea'
    );
    expect(response.statusCode).toBe(200);
  });
  test('Test the app returns error with message "Model with that ID field does not exist" on a get request /exam/:id', async () => {
    const response = await request(app).get(
      '/exam/fc8ea3f5-abe2-4b0c-8fb1-6a1da404f253'
    );
    expect(response._body.message).toMatch(
      'Model with that ID field does not exist'
    );
  });
  test('Test wether the app returns 201 Created on a post request /exam', async () => {
    const body = {
      name: 'Chem 1st exam',
      course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba',
      date: new Date(),
      time: new Date()
    };
    const response = await request(app)
      .post('/exam')
      .send(body)
      .expect('Content-Type', /json/);
    expect(response.statusCode).toBe(201);
  });
  test('Test wether the app returns 200 OK on a put request /exam/:id', async () => {
    const exam = await models.Exam.findOne({
      where: { name: 'Chem 1st exam' }
    });
    const body = { name: 'Chem 2nd exam' };
    const response = await request(app)
      .put(`/exam/${exam.id}`)
      .send(body);
    expect(response.statusCode).toBe(200);
  });
  test('Test wether the app returns 204 No Content on a delete request /exam/:id', async () => {
    const exam = await models.Exam.findOne({
      where: { name: 'Chem 2nd exam' }
    });
    const response = await request(app).delete(`/exam/${exam.id}`);
    expect(response.statusCode).toBe(204);
  });
});
