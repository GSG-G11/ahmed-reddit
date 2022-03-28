/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server/app');

const loginInput = { email: 'ahmed_qeshta@gmail.com', password: 'pa$$W0rd!' };
const loginNotExistInput = {
  email: 'ahmed_qeshtaNot_Exist@gmail.com',
  password: 'pa$$W0rd!',
};
const registerExistInput = {
  username: 'ahmed_qeshta',
  email: 'ahmed_qeshta@gmail.com',
  password: 'pa$$W0rd!',
  confirmPassword: 'pa$$W0rd!',
};
const registerNotExistInput = {
  username: 'ahmed_qeshta2',
  email: 'ahmed_qeshta2@gmail.com',
  password: 'pa$$W0rd!',
  confirmPassword: 'pa$$W0rd!',
};
const updateProfileInput = {
  username: 'ahmed_qeshta2',
  age: 'ahmed_qeshta2@gmail.com',
  url_image:
    'pahttps://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.pngW0rd!',
  bio: 'my name is  ahmed',
};
const updatePasswordInput = {
  currentPassword: 'pa$$W0rd!',
  password: 'pa$$W0rd!',
  confirmPassword: 'pa$$W0rd!',
};

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

describe('Test the unknown path in server', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/unknown')
      .expect(301)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });
  test('It should response the GET method', (done) => {
    request(app)
      .get('/404')
      .expect(301)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });
});

describe('Test the path auth path in server', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/auth/register')
      .expect(301)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });

  test('It should response the GET method', (done) => {
    request(app)
      .get('/auth/login')
      .expect(301)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });

  test('It should response the GET method', (done) => {
    request(app)
      .get('/api/v1/check-cookies')
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });

  test('It should response the post method', (done) => {
    request(app)
      .post('/api/v1/login')
      .send(loginInput)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });

  test('It should response the post method', (done) => {
    request(app)
      .post('/api/v1/login')
      .send(loginNotExistInput)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });

  test('It should response the post method', (done) => {
    request(app)
      .post('/api/v1/register')
      .send(registerExistInput)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });
  test('It should response the post method', (done) => {
    request(app)
      .post('/api/v1/register')
      .send(registerNotExistInput)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });

  test('It should response the post method', (done) => {
    request(app)
      .post('/api/v1/logout')
      .send(registerNotExistInput)
      .expect(301)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });
});

describe('Test the Profile path in server', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/profile')
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });
  test('It should response the GET method', (done) => {
    request(app)
      .get('/profile/user/1/show')
      .expect(301)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });

  test('It should response the GET method', (done) => {
    request(app)
      .get('/api/v1/profile/1')
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });

  test('It should response the GET method', (done) => {
    request(app)
      .get('/api/v1/profile/user/1/show')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });

  test('It should response the GET method', (done) => {
    request(app)
      .put('/api/v1/profile/update')
      .send(updateProfileInput)
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });

  test('It should response the GET method', (done) => {
    request(app)
      .put('/api/v1/profile/password/update')
      .send(updatePasswordInput)
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });
});
