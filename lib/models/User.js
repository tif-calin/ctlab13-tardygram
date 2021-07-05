import pool from '../utils/pool.js';

export default class User {
  id;
  username;
  passwordHash;
  profilePhotoUrl;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.passwordHash = row.password_hash;
    this.profilePhotoUrl = row.profile_photo_url;
  }

  static async create({ username, passwordHash, profilePhotoUrl }) {
    const { rows } = await pool.query(`
      INSERT INTO users (username, password_hash, profile_photo_url)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [username, passwordHash, profilePhotoUrl]);

    return new User(rows[0]);
  }
}
