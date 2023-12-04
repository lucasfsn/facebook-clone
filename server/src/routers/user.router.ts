import 'dotenv/config';
import { Router } from 'express';
import * as UserController from '../controllers/user';

export const userRouter = Router()
  .post('/signup', UserController.signUp)
  .post('/login', UserController.login)
  .patch('/change-password', UserController.changePassword)
  .put('/change/:data', UserController.changeUserInfo)
  .delete('/delete/:id', UserController.deleteUser);
