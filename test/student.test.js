const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { studentTest } = require('../testSeed/seed');
const { execSync } = require('child_process');

describe('Testing all student routes', () => {
  let jwt;
  beforeAll(async () => {
    execSync('npm run migrate:test');
    execSync('npm run seed:test');

    const response = await request(app)
    .post('/login')
    .send({
      email: 'john@example.com',
      password: 'test1234'
    });
    jwt = response._body.token;
    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    execSync('npm run undo:seed:test');
    execSync('npm run undo:migrate:test');
    await models.sequelize.close();
  });

  test('Test wether the app returns 200 OK on a get request /student', async () => {
    const response = await request(app).get('/student').set('Authorization', `Bearer ${jwt}`);
    expect(response.statusCode).toBe(200);
  });
  test('Test wether the app returns 200 OK on a get request /student/:id', async () => {
    const response = await request(app)
    .get('/student/0a8b7414-4773-42d8-97ff-0c441e4e2c3e')
    .set('Authorization', `Bearer ${jwt}`);
    expect(response.statusCode).toBe(200);
  });
  test('Test the app returns error with message "Model with that ID field does not exist" on a get request /student/:id', async () => {
    const response = await request(app)
    .get('/student/20c1297e-58f6-4587-842b-231ff6583083')
    .set('Authorization', `Bearer ${jwt}`);
    expect(response._body.message).toMatch(
      'Model with that ID field does not exist'
    );
  });
  test('Test wether the app returns 201 Created on a post request /student', async () => {
    const body = {
      full_name: 'Mike Smith',
      email: 'mike.smith3@gmail.com',
      address: '4rd Blvd',
      phone_number: '+3859159691223',
      password: 'test1234',
      major_id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6c'
  };
    const response = await request(app)
      .post('/student')
      .send(body)
      .set('Authorization', `Bearer ${jwt}`)
      .expect('Content-Type', /json/);
    expect(response.statusCode).toBe(201);
  });
  test('Test wether the app returns 204 No Content on a delete request /student/:id', async () => {
    const student = await models.Student.findOne({
      where: { email: 'mike.smith3@gmail.com' }
    });
    const response = await request(app)
    .delete(`/student/${student.id}`)
    .set('Authorization', `Bearer ${jwt}`);
    expect(response.statusCode).toBe(204);
  });
  test('Test wether the app returns 200 OK on a put request /student/:id', async () => {
    const body = { full_name: 'Mike Smitherino' };
    const response = await request(app)
      .put('/student/20c1297e-58f6-4587-842b-231ff6583086')
      .set('Authorization', `Bearer ${jwt}`)
      .send(body);
    expect(response.statusCode).toBe(200);
  });
});
