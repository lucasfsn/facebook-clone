import 'dotenv/config';
import { Router } from 'express';
import * as ImageController from '../controllers/image';
import { uploadImage } from '../middlewares/image';

export const imageRouter = Router()
  .post('/upload', uploadImage, ImageController.uploadImage)
  .post('/getAll', ImageController.getImages)
  .delete('/delete/:id', ImageController.deleteImage);
