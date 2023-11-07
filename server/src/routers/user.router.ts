import 'dotenv/config';
import { Router } from 'express';

export const userRouter = Router()
  .get('/user', (req, res) => {
    res.send('User');
  })
  .get('/user/:id', (req, res) => {
    res.send(req.params.id);
  });
