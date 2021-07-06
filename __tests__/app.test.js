import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

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

describe('post routes', () => {
  const agent = request.agent(app);
  let post1, post2, user1;

  beforeEach(async () => {
    setup(pool);

    // post a user
    user1 = {
      username: 'user1',
      profilePhotoUrl: 'https://placekitten.com/300/200',
      password: 'password'
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user1)
    ;

    // sign in the user
    const res = await agent
      .post('/api/v1/auth/signin')
      .send(user1)
    ;

    // make test posts
    post1 = {
      userId: res.body.id,
      photoUrl: 'https://placekitten.com/300/300',
      caption: 'my baby!!!',
      tags: ['kitten', 'cat', 'pets']
    };
    post2 = {
      userId: res.body.id,
      photoUrl: 'https://placekitten.com/333/222',
      caption: 'does anyone know whose cat this is?',
      tags: ['lost', 'cat', 'found', 'missing']
    };
  });

  test('POST for /api/v1/posts', async () => {
    // make a post
    const res = await agent
      .post('/api/v1/posts')
      .send(post1)
    ;

    // test that post is correct
    expect(res.body).toEqual({ ...post1, id: expect.any(String) });
  });

  test('GET all posts from /api/v1/posts', async () => {
    // post 2 posts
    const p1 = await agent.post('/api/v1/posts').send(post1);
    const p2 = await agent.post('/api/v1/posts').send(post2);

    // get the posts
    const res = await agent.get('/api/v1/posts');
   
    // test
    expect(res.body).toEqual([p1.body, p2.body]);
  });

  test('GET popular posts from /api/v1/posts/popular', async () => {
    // post 12 posts
    const posts = [];
    for (let i = 0; i < 12; i++) posts.push(await agent.post('/api/v1/posts').send({
      ...post1,
      photoUrl: `https://placekitten.com/${i + 1}00/${i + 1}00`
    }));

    // can't finish writing this test until I finish the comment routes... 
  });
});

describe('comment routes', () => {
  const agent = request.agent(app);

  let user, comment;

  beforeEach(async () => {
    setup(pool);

    // post a user
    user = {
      username: 'user1',
      profilePhotoUrl: 'https://placekitten.com/300/200',
      password: 'password'
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user)
    ;

    // sign in the user
    const userRes = await agent
      .post('/api/v1/auth/signin')
      .send(user)
    ;

    // post a post
    const postRes = await agent.post('/api/v1/posts').send({
      userId: userRes.body.id,
      photoUrl: 'https://placekitten.com/300/300',
      caption: 'my baby!!!',
      tags: ['kitten', 'cat', 'pets']
    });

    // recreate comment
    comment = {
      userId: userRes.body.id,
      postId: postRes.body.id,
      comment: 'yasssss'
    };
  });

  test('POST a comment to /api/v1/comments', async () => {
    // post a comment
    const res = await agent.post('/api/v1/comments').send(comment);

    // test it
    expect(res.body).toEqual({ ...comment, id: expect.any(String) });
  });

  test('DELETE a comment from /api/v1/comments/:id', async () => {
    // post a comment
    const res1 = await agent.post('/api/v1/comments').send(comment);

    // delete that comment
    const res2 = await agent.delete(`/api/v1/comments/${res1.body.id}`);

    // test to see returned comment is correct
    expect(res2.body).toEqual({ ...comment, id: expect.any(String) });
  });
});
