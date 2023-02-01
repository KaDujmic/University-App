const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { enrollmentTest } = require('../testSeed/seed');
const { execSync } = require('child_process');

describe('Testing all ENROLLMENT routes', () => {
  // eslint-disable-next-line no-unused-vars
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
  describe('Testing all GET ENROLLMENT routes', () => {
    test('Test wether the app returns 200 OK on a get request /enrollment', async () => {
      const response = await request(app)
      .get('/enrollment')
      .set('Authorization', `Bearer ${jwt}`);
      expect(response.statusCode).toBe(200);
    });
    describe.each([
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          course_id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd'
        }, 200],
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2c28345a212d',
          course_id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd'
        }, 404],
      [{ student_id: 2 }, 500]
    ])('Testing GET ENROLLMENT route with enrollment id', (enrollmentBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app)
        .get(`/enrollment/${enrollmentBody.student_id}/${enrollmentBody.course_id}`)
        .set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all POST ENROLLMENT routes', () => {
    describe.each([
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba'
        }, 201
      ],
      [{ name: 'TestName' }, 400],
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          course_id: '4db29f8f-9295-2369-88bf-1cc4bdf82dfd'
        }, 400
      ]
    ])('Testing POST ENROLLMENT route', (enrollmentBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app)
        .post('/enrollment')
        .send(enrollmentBody)
        .set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all PUT ENROLLMENT routes', () => {
    describe.each([
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          course_id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd'
        }, { course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba' }, 500]
      // eslint-disable-next-line max-len
      // [
      //   {
      //     student_id: 'f0d0ea4d-0e40-4987-866e-154da59552c5',
      //     course_id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea'
      //   }, { student_id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6e' }, 400] TODO ----~----
    ])('Testing PUT ENROLLMENT route', (enrollmentId, enrollmentBody, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app)
        .put(`/enrollment/${enrollmentId.student_id}/${enrollmentId.course_id}`)
        .send(enrollmentBody)
        .set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
  describe('Testing all DELETE ENROLLMENT routes', () => {
    describe.each([
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba'
        }, 204
      ],
      [
        {
          student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
          course_id: '4db29f8f-9295-4369-88bf-ecc4bdf82dfd'
        }, 404
      ],
      [{ id: 2 }, 500]
    ])('Testing DELETE ENROLLMENT route', (enrollmentId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app)
        .delete(`/enrollment/${enrollmentId.student_id}/${enrollmentId.course_id}`)
        .set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
});
