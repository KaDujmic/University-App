const request = require('supertest');
const models = require('../models');
const app = require('../app');

describe('Testing all result routes', () => {
  test('Test wether the app returns 200 OK on a get request /result', async () => {
    console.log(process.env.PORT);
    const response = await request(app).get('/result');
    expect(response.statusCode).toBe(200);
  });
  test('Test wether the app returns 200 OK on a get request /result/:id', async () => {
    const response = await request(app).get(
      '/result/edfe47ef-c998-4c29-8800-b3abbf152eba'
    );
    expect(response.statusCode).toBe(200);
  });
  test('Test the app returns error with message "Model with that ID field does not exist" on a get request /result/:id', async () => {
    const response = await request(app).get(
      '/result/fc8ea3f5-abe2-4b0c-8fb1-6a1da404f253'
    );
    expect(response._body.message).toMatch(
      'Model with that ID field does not exist'
    );
  });
  test('Test wether the app returns 201 Created on a post request /result', async () => {
    const body = {
      name: 'Chem 103',
      credit_hours: 5,
      major_id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6c'
    };
    const response = await request(app)
      .post('/result')
      .send(body)
      .expect('Content-Type', /json/);
    expect(response.statusCode).toBe(201);
  });
  test('Test wether the app returns 200 OK on a put request /result/:student_id/:course_id', async () => {
    const result = await models.Result.findOne({
      where: { name: 'Chem 103' }
    });
    const body = { name: 'Chem 104' };
    const response = await request(app)
      .put(`/result/${result.id}`)
      .send(body);
    expect(response.statusCode).toBe(200);
  });
  test('Test the app returns 204 No Content on a delete request /result/:student_id/:course_id', async () => {
    const result = await models.Result.findOne({
      where: { name: 'Chem 104' }
    });
    const response = await request(app).delete(`/result/${result.id}`);
    expect(response.statusCode).toBe(204);
  });
  afterAll(async () => {
    await models.sequelize.close();
  });
});
