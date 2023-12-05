import 'dotenv/config';
import { Router } from 'express';
import * as PostController from '../controllers/post';

export const postRouter = Router()
  .post('/add', PostController.createPost)
  .get('/all', PostController.allPosts);
