const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { professorTest } = require('../testSeed/seed');
const { execSync } = require('child_process');

describe('Testing all professor routes', () => {
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

  describe('Testing all GET PROFESSOR routes', () => {
    test('Test wether the app returns 200 OK on a get request /professor', async () => {
      const response = await request(app).get('/professor').set('Authorization', `Bearer ${jwt}`);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.statusCode).toBe(200);
    });
    describe.each([
      [{ id: '20c1297e-58f6-4587-842b-231ff6583086' }, 200],
      [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc64' }, 404],
      [{ id: 2 }, 500]
    ])('Testing GET PROFESSOR route with professor id', (professorBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).get(`/professor/${professorBody.id}`).set('Authorization', `Bearer ${jwt}`);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all POST PROFESSOR routes', () => {
    describe.each([
      [
        {
          full_name: 'John Doe',
          address: '1st Blvd',
          phone_number: '+385925962313',
          department_id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252',
          email: 'john2@example.com',
          password: 'test1234'
        }, 201],
      [{ email: 'john@example.com' }, 400],
      [{
          id: '20c1297e-58f6-4587-842b-231ff6583081',
          full_name: 'John Doe',
          address: '1st Blvd',
          phone_number: '+385925962312',
          department_id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252',
          email: 'john2@example.com',
          password: 'test1234'
        }, 400]
    ])('Testing POST PROFESSOR route', (professorBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).post('/professor').send(professorBody).set('Authorization', `Bearer ${jwt}`);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all PUT PROFESSOR routes', () => {
    describe.each([
      [{ id: '20c1297e-58f6-4587-842b-231ff6583086' }, { email: 'john3@example.com' }, 200],
      [{ id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1' }, { id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e', full_name: 'TestName 2' }, 400],
      [{ id: '805a10d7-1735-4a6c-a4cd-0be767aaeca2' }, { full_name: 'test name' }, 404]
    ])('Testing PUT PROFESSOR route', (professorId, professorBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).put(`/professor/${professorId.id}`).send(professorBody).set('Authorization', `Bearer ${jwt}`);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all DELETE PROFESSOR routes', () => {
    describe.each([
      [{ id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1' }, 204],
      [{ id: '420ad58b-d4a2-4e71-93a3-714759d8e7e3' }, 404],
      [{ id: 2 }, 500]
    ])('Testing DELETE PROFESSOR route', (professorId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).delete(`/professor/${professorId.id}`).set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing get STUDENTS PROFESSOR route', () => {
    describe.each([
      [{ id: '20c1297e-58f6-4587-842b-231ff6583086' }, 200]
      // [{ id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e' }, 404] TODO
    ])('Testing GET PROFESSOR route', (professorId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).get(`/professor/${professorId.id}/courses`).set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
});
