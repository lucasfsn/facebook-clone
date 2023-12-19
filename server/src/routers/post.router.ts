import 'dotenv/config';
import { Router } from 'express';
import * as PostController from '../controllers/post';

export const postRouter = Router()
  .post('/add', PostController.createPost)
  .get('/all', PostController.allPosts)
  .delete('/:id', PostController.deletePost)
  .post('/comment', PostController.commentPost)
  .put('/edit/:id', PostController.editPost)
  .delete('/comment/:id', PostController.deleteComment);
