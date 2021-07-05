import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import User from '../lib/models/User.js';

describe('user routes', () => {
  let user1;

  beforeEach(() => {
    user1 = {
      username: 'user1',
      profilePhotoUrl: 'https://placekitten.com/300/200',
      password: 'password'
    };

    return setup(pool);
  });

  test('create account using POST to /api/v1/auth/signup', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(user1)
    ;

    expect(res.body).toEqual({
      id: '1',
      username: user1.username,
      profilePhotoUrl: user1.profilePhotoUrl,
      passwordHash: expect.any(String)
    });
  });

  test('sign in using POST to /api/v1/auth/signin', async () => {
    // post a user
    await request(app)
      .post('/api/v1/auth/signup')
      .send(user1)
    ;

    // try to sign in as that user
    const res = await request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: user1.username,
        password: user1.password
      })
    ;

    // test to see if correct response
    expect(res.body).toEqual({
      id: '1',
      username: user1.username,
      profilePhotoUrl: user1.profilePhotoUrl,
      passwordHash: expect.any(String)
    });
  });

  test.skip('get most commented on users with GET to /api/v1/users/popular', async () => {

  });

  test.skip('get users with most posts using GET to /api/v1/users/prolific', async () => {

  });

  test.skip('get users with most comments using GET to /api/v1/users/leader', async () => {

  });

  test.skip('get users with most $avg using GET to /api/v1/users/impact', async () => {

  });
});

describe.skip('post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
});

describe.skip('comment routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
});
