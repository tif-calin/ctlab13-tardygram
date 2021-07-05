import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import userController from './controllers/users.js';
import postController from './controllers/posts.js';
import commentController from './controllers/comments.js';

const app = express();

app.use(express.json());

app.use('/api/v1', userController);
app.use('/api/v1/posts', postController);
app.use('/api/v1/comments', commentController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
