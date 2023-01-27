const request = require('supertest');
const models = require('../models');
const app = require('../app');

describe('Testing all department routes', () => {
  test('Test wether the app returns 200 OK on a get request /department', async () => {
    const response = await request(app).get('/department');
    expect(response.statusCode).toBe(200);
  });
  test('Test wether the app returns 200 OK on a get request /department/:id', async () => {
    const response = await request(app).get(
      '/department/fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252'
    );
    expect(response.statusCode).toBe(200);
  });
  test('Test the app returns error with message "Model with that ID field does not exist" on a get request /department/:id', async () => {
    const response = await request(app).get(
      '/department/fc8ea3f5-abe2-4b0c-8fb1-6a1da404f253'
    );
    expect(response._body.message).toMatch(
      'Model with that ID field does not exist'
    );
  });
  test('Test wether the app returns 201 Created on a post request /department', async () => {
    const body = {
      name: 'Economics'
    };
    const response = await request(app)
      .post('/department')
      .send(body)
      .expect('Content-Type', /json/);
    expect(response.statusCode).toBe(201);
  });
  test('Test wether the app returns 200 OK on a put request /department/:id', async () => {
    const department = await models.Department.findOne({
      where: { name: 'Economics' }
    });
    const body = { name: 'Advanced Economics' };
    const response = await request(app)
      .put(`/department/${department.id}`)
      .send(body);
    expect(response.statusCode).toBe(200);
  });
  test('Test wether the app returns 204 No Content on a delete request /department/:id', async () => {
    const department = await models.Department.findOne({
      where: { name: 'Advanced Economics' }
    });
    const response = await request(app).delete(`/department/${department.id}`);
    expect(response.statusCode).toBe(204);
  });
  afterAll(async () => {
    await models.sequelize.close();
  });
});
