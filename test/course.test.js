const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { courseTest } = require('../testSeed/seed');
const { execSync } = require('child_process');

describe('Testing all course routes', () => {
  beforeAll(async () => {
    execSync('npm run migrate:test');
    execSync('npm run seed:test');
  });

  afterAll(async () => {
    execSync('npm run undo:seed:test');
    execSync('npm run undo:migrate:test');
    await models.sequelize.close();
  });

  test('Test wether the app returns 200 OK on a get request /course', async () => {
    const response = await request(app).get('/course');
    console.log(process.env);
    expect(response.statusCode).toBe(200);
  });

  test('Test wether the app returns 200 OK on a get request /course/:id', async () => {
    const response = await request(app).get(
      '/course/edfe47ef-c998-4c29-8800-b3abbf152eba'
    );
    expect(response.statusCode).toBe(200);
  });

  test('Test the app returns error with message "Model with that ID field does not exist" on a get request /course/:id', async () => {
    const response = await request(app).get(
      '/course/fc8ea3f5-abe2-4b0c-8fb1-6a1da404f253'
    );
    expect(response._body.message).toMatch(
      'Model with that ID field does not exist'
    );
  });

  test('Test wether the app returns 201 Created on a post request /course', async () => {
    const body = {
      name: 'Chem 103',
      credit_hours: 5,
      major_id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6c'
    };
    const response = await request(app)
      .post('/course')
      .send(body)
      .expect('Content-Type', /json/);
    expect(response.statusCode).toBe(201);
  });

  test('Test wether the app returns 200 OK on a put request /course/:id', async () => {
    const course = await models.Course.findOne({
      where: { name: 'Chem 103' }
    });
    const body = { name: 'Chem 104' };
    const response = await request(app)
      .put(`/course/${course.id}`)
      .send(body);
    expect(response.statusCode).toBe(200);
  });

  test('Test wether the app returns 204 No Content on a delete request /course/:id', async () => {
    const course = await models.Course.findOne({
      where: { name: 'Chem 104' }
    });
    const response = await request(app).delete(`/course/${course.id}`);
    expect(response.statusCode).toBe(204);
  });
});
