import 'dotenv/config';
import { Router } from 'express';
import * as ReactionController from '../controllers/reaction';

export const reactionRouter = Router()
  .post('/add', ReactionController.addReaction)
  .get('/get/:postId/:userId', ReactionController.getReaction);
