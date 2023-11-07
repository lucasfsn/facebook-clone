import cors from 'cors';
import express from 'express';
import { userRouter } from './routers/user.router';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// Routers
app.use('/', userRouter);

export default app;
