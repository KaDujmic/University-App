const request = require('supertest');
const models = require('../models');
const app = require('../app');

describe('Testing all major routes', () => {
  test('Test wether the app returns 200 OK on a get request /major', async () => {
    const response = await request(app).get('/major');
    expect(response.statusCode).toBe(200);
  });
  test('Test wether the app returns 200 OK on a get request /major/:id', async () => {
    const response = await request(app).get(
      '/major/a49aeff9-2eec-4c76-8a06-68fa44d6dc6c'
    );
    expect(response.statusCode).toBe(200);
  });
  test('Test wether the app returns error with message "Model with that ID field does not exist" on a get request /major/:id', async () => {
    const response = await request(app).get(
      '/major/420ad58b-d4a2-4e71-9fa3-724759d8e7ee'
    );
    expect(response._body.message).toMatch(
      'Model with that ID field does not exist'
    );
  });
  test('Test wether the app returns 201 Created on a post request /major', async () => {
    const body = {
      name: 'Advanced Computing',
      department_id: '1076625a-bcc5-49ea-b0e5-9ce3f8f0b2bf'
    };
    const response = await request(app)
      .post('/major')
      .send(body)
      .expect('Content-Type', /json/);
    expect(response.statusCode).toBe(201);
  });
  test('Test wether the app returns 204 No Content on a delete request /major/:id', async () => {
    const major = await models.Major.findOne({
      where: { name: 'Advanced Computing' }
    });
    const response = await request(app).delete(`/major/${major.id}`);
    expect(response.statusCode).toBe(204);
  });
  test('Test wether the app returns 200 OK on a put request /major/:id', async () => {
    const body = { name: 'Computing' };
    const response = await request(app)
      .put('/major/f74e4e5d-f345-4947-a43b-965c6fad6a71')
      .send(body);
    expect(response.statusCode).toBe(200);
  });
  afterAll(async () => {
    await models.sequelize.close();
  });
});
