const request = require('supertest');
const models = require('../models');
const app = require('../app');

describe('Testing all professor routes', () => {
  let jwt;
  beforeAll(async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'john@example.com',
        password: 'test1234'
      });
    jwt = response._body.token;
    expect(response.statusCode).toBe(200);
  });

  test('Test wether the app returns 200 OK on a get request /professor', async () => {
    const response = await request(app).get('/professor').set('Authorization', `Bearer ${jwt}`);
    expect(response.statusCode).toBe(200);
  });
  test('Test wether the app returns 200 OK on a get request /professor/:id', async () => {
    const response = await request(app)
    .get('/professor/20c1297e-58f6-4587-842b-231ff6583086')
    .set('Authorization', `Bearer ${jwt}`);
    expect(response.statusCode).toBe(200);
  });
  test('Test the app returns error with message "Model with that ID field does not exist" on a get request /professor/:id', async () => {
    const response = await request(app)
    .get('/professor/20c1297e-58f6-4587-842b-231ff6583083')
    .set('Authorization', `Bearer ${jwt}`);
    expect(response._body.message).toMatch(
      'Model with that ID field does not exist'
    );
  });
  test('Test wether the app returns 201 Created on a post request /professor', async () => {
    const body = {
      full_name: 'John Doe',
      address: '1st Blvd',
      phone_number: '+385925961311',
      department_id: '1076625a-bcc5-49ea-b0e5-9ce3f8f0b2bf',
      email: 'john2@example.com',
      password: 'test1234'
  };
    const response = await request(app)
      .post('/professor')
      .send(body)
      .set('Authorization', `Bearer ${jwt}`)
      .expect('Content-Type', /json/);
    expect(response.statusCode).toBe(201);
  });
  test('Test wether the app returns 204 No Content on a delete request /professor/:id', async () => {
    const professor = await models.Professor.findOne({
      where: { email: 'john2@example.com' }
    });
    const response = await request(app)
    .delete(`/professor/${professor.id}`)
    .set('Authorization', `Bearer ${jwt}`);
    expect(response.statusCode).toBe(204);
  });
  test('Test wether the app returns 200 OK on a put request /professor/:id', async () => {
    const body = { full_name: 'John Donut' };
    const response = await request(app)
      .put('/professor/20c1297e-58f6-4587-842b-231ff6583086')
      .set('Authorization', `Bearer ${jwt}`)
      .send(body);
    expect(response.statusCode).toBe(200);
  });
  afterAll(async () => {
    await models.sequelize.close();
  });
});
