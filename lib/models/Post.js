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
      FROM posts
    `);

    return rows.map(row => new Post(row));
  }

  static async findById(id) {
    return id;
  }
}
