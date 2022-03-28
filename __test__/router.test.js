/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server/app');

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });
});
