import { Router } from 'express';
import ensureAuths from '../middleware/ensure-auth.js';
import Post from '../models/Post.js';

export default Router() 
  .post('/', ensureAuths, (req, res, next) => {
    Post.create(req.body)
      .then(post => res.send(post))
      .catch(next)
    ;
  })
  .get('/', ensureAuths, (req, res, next) => {
    Post.findAll()
      .then(posts => res.send(posts))
      .catch(next)
    ;
  })
  .get('/popular', (req, res, next) => {
    Post.findPopular(10)
      .then(posts => res.send(posts))
      .catch(next)
    ;
  })
  .get('/:id', ensureAuths, (req, res, next) => {
    Post.getById(req.params.id)
      .then(posts => res.send(posts))
      .catch(next)
    ;
  })
  .patch('/:id', ensureAuths, (req, res, next) => {
    Post.patch(req.params.id)
      .then(posts => res.send(posts))
      .catch(next)
    ;
  })
  .delete('/:id', ensureAuths, (req, res, next) => {
    Post.delete(req.params.id)
      .then(posts => res.send(posts))
      .catch(next)
    ;
  })
;
