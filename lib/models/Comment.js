import pool from '../utils/pool.js';

export default class Comment {
  id;
  userId;
  postId;
  comment;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.postId = row.post_id;
    this.comment = row.comment;
  }
}
