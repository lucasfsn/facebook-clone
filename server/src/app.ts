import cors from 'cors';
import express, { json } from 'express';
import { userRouter } from './routers/user.router';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(json());

// Routers
app.use('/', userRouter);

export default app;
