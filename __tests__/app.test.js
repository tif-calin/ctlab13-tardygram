import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('create account using POST to /api/v1/auth/signup', async () => {
    const user = {
      username: 'user1',
      profilePhotoUrl: 'https://placekitten.com/300/200',
      password: 'password'
    };

    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(user)
    ;

    expect(res.body).toEqual({
      id: '1',
      username: user.username,
      profilePhotoUrl: user.profilePhotoUrl,
      passwordHash: expect.any(String)
    });
  });

  test.skip('sign in using POST to /api/v1/auth/signin', async () => {

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

describe('post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
});

describe('comment routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
});
