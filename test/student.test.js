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

  describe('Testing all GET STUDENT routes', () => {
    test('Test wether the app returns 200 OK on a get request /student', async () => {
      const response = await request(app).get('/student').set('Authorization', `Bearer ${jwt}`);
      expect(response.statusCode).toBe(200);
    });
    describe.each([
      [{ id: 'f034675d-8d14-463f-a360-2e28345a212d' }, 200],
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc64' }, 404],
      [{ id: 2 }, 500]
    ])('Testing GET STUDENT route with student id', (studentBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).get(`/student/${studentBody.id}`).set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all POST STUDENT routes', () => {
    describe.each([
      [
        {
          full_name: 'John Doe',
          address: '1st Blvd',
          phone_number: '+385925962313',
          major_id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6c',
          email: 'john2@example.com',
          password: 'test1234'
        }, 201],
      [{ email: 'john@example.com' }, 400],
      [{
          id: '20c1297e-58f6-4587-842b-231ff6583081',
          full_name: 'John Doe',
          address: '1st Blvd',
          phone_number: '+385925962312',
          major_id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6c',
          email: 'mike2@example.com',
          password: 'test1234'
        }, 400]
    ])('Testing POST STUDENT route', (studentBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).post('/student').send(studentBody).set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all PUT STUDENT routes', () => {
    describe.each([
      [{ id: 'f034675d-8d14-463f-a360-2e28345a212d' }, { email: 'mike.test@example.com' }, 200],
      [{ id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1' }, { id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e', full_name: 'TestName 2' }, 400],
      [{ id: '805a10d7-1735-4a6c-a4cd-0be767aaeca2' }, { full_name: 'test name' }, 404]
    ])('Testing PUT STUDENT route', (studentId, studentBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).put(`/student/${studentId.id}`).send(studentBody).set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all DELETE STUDENT routes', () => {
    describe.each([
      [{ id: 'f034675d-8d14-463f-a360-2e28345a212d' }, 204],
      [{ id: '420ad58b-d4a2-4e71-93a3-714759d8e7e3' }, 404],
      [{ id: 2 }, 500]
    ])('Testing DELETE STUDENT route', (studentId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).delete(`/student/${studentId.id}`).set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing get STUDENTS STUDENT route', () => {
    describe.each([
      [{ id: 'f034675d-8d14-463f-a360-2e28345a212d' }, 200],
      // [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e' }, 404] TODO
    ])('Testing GET STUDENT route', (studentId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).get(`/student/${studentId.id}/courses`).set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
});
