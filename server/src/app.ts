import cors from 'cors';
import express, { json } from 'express';
import fileUpload from 'express-fileupload';
import { imageRouter } from './routers/image.router';
import { postRouter } from './routers/post.router';
import { reactionRouter } from './routers/reaction.router';
import { userRouter } from './routers/user.router';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routers
app.use('/', userRouter);
app.use('/post', postRouter);
app.use('/image', imageRouter);
app.use('/reaction', reactionRouter);

export default app;
