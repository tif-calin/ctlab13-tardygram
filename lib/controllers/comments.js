import { Router } from 'express';

export default Router() 
  .post('', (req, res, next) => {
    try {
      //
    }
    catch (err) {
      next(err);
    }
  })
;
