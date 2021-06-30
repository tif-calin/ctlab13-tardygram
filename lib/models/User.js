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
}
