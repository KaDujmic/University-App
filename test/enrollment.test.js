const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { enrollmentTest } = require('../testSeed/seed');
const { execSync } = require('child_process');

describe('Testing all enrollment routes', () => {
    beforeAll(() => {
      execSync('npm run migrate:test');
      execSync('npm run seed:test');
    });

    afterAll(async () => {
      execSync('npm run undo:migrate:test');
      await models.sequelize.close();
    });
  test('Test wether the app returns 200 OK on a get request /enrollment', async () => {
    const response = await request(app).get('/enrollment');
    expect(response.statusCode).toBe(200);
  });
  test('Test wether the app returns 200 OK on a get request /enrollment/:student_id/:course_id', async () => {
    const response = await request(app).get(
      '/enrollment/f034675d-8d14-463f-a360-2e28345a212d/edfe47ef-c998-4c29-8800-b3abbf152eba'
    );
    expect(response.statusCode).toBe(200);
  });
  // eslint-disable-next-line max-len
  test('Test the app returns error with message "Model with that ID field does not exist" on a get request /enrollment/:student_id/:course_id', async () => {
    const response = await request(app).get(
      '/enrollment/f034675d-8d14-463f-a360-2e28345a212d/edfe47ef-c998-4c29-8800-b3abbf152eb1'
    );
    expect(response._body.message).toMatch(
      'Model with that ID field does not exist'
    );
  });
  test('Test wether the app returns 201 Created on a post request /enrollment', async () => {
    const body = {
      student_id: '0a8b7414-4773-42d8-97ff-0c441e4e2c3e',
      course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba',
      grade: 3
  };
    const response = await request(app)
      .post('/enrollment')
      .send(body)
      .expect('Content-Type', /json/);
    expect(response.statusCode).toBe(201);
  });
  test('Test wether the app returns 200 OK on a put request /enrollment/:student_id/:course_id', async () => {
    const enrollment = await models.Enrollment.findOne({
      where: {
      student_id: '0a8b7414-4773-42d8-97ff-0c441e4e2c3e',
      course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba'
    }
    });
    const body = { course_id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd' };
    const response = await request(app)
      .put(`/enrollment/${enrollment.student_id}/${enrollment.course_id}`)
      .send(body);
    expect(response.statusCode).toBe(200);
  });
  test('Test the app returns 204 No Content on a delete request /enrollment/:student_id/:course_id', async () => {
    const enrollment = await models.Enrollment.findOne({
      where: {
      student_id: '0a8b7414-4773-42d8-97ff-0c441e4e2c3e',
      course_id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd'
    }
    });
    const response = await request(app).delete(`/enrollment/${enrollment.student_id}/${enrollment.course_id}`);
    expect(response.statusCode).toBe(204);
  });
});
