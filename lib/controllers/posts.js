import { Router } from 'express';
import ensureAuths from '../middleware/ensure-auth.js';
import Post from '../models/Post.js';

export default Router() 
  .post('', ensureAuths, (req, res, next) => {
    Post.create(req.body)
      .then(post => res.send(post))
      .catch(next)
    ;
  })
  .get('', ensureAuths, (req, res, next) => {
    Post.findAll()
      .then(posts => res.send(posts))
      .catch(next)
    ;
  })
;
