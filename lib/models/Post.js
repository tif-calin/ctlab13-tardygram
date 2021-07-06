import pool from '../utils/pool.js';

export default class Post {
  id;
  userId;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async create({ userId, photoUrl, caption, tags }) {
    const { rows } = await pool.query(`
      INSERT INTO posts (user_id, photo_url, caption, tags)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [userId, photoUrl, caption, tags]);

    return new Post(rows[0]);
  }

  static async findBy(val, key = 'id') {
    const { rows } = await pool.query(`
      SELECT *
      FROM posts
      WHERE ${key} = $1;
    `, [val]);

    if (!rows[0]) return null;
    return new Post(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
      SELECT *
      FROM posts;
    `);

    return rows.map(row => new Post(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(`
      SELECT p.*, c.*
      FROM posts p
      INNER JOIN users u
        ON p.user_id = u.id
      INNER JOIN comments c
        ON p.user_id = c.comment_by
      WHERE p.id = $1;
    `, [id]);

    return { ...new Post(rows[0]), comments: rows.map(p => p.comment) };
  }

  static async findPopular(n) {
    const { rows } = await pool.query(`
      SELECT p.*, COUNT(c.comment)
      FROM comments c
      INNER JOIN posts p
        ON p.id = c.post_id
      GROUP BY p.id
      ORDER BY count DESC
      LIMIT ${n};
    `);

    return rows.map(row => new Post(row));
  }

  static async patch(id, val, key = 'caption') {
    const { rows } = await pool.query(`
      UPDATE posts
      SET ${key} = $2
      WHERE id = $1
      RETURNING *;
    `, [id, val]);

    return new Post(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM posts
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return new Post(rows[0]);
  }
}
