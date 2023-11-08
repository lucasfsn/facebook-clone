import 'dotenv/config';
import { Router } from 'express';
import * as UserController from '../controllers/users';

export const userRouter = Router()
  .post('/signup', UserController.signUp)
  .post('/signin', UserController.signIn);
