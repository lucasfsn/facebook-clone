import { RequestHandler } from 'express';
import PostModel from '../models/post';

interface PostBody {
  content: string;
  images?: string[];
  user: string;
}

export const createPost: RequestHandler<
  unknown,
  unknown,
  PostBody,
  unknown
> = async (req, res) => {
  try {
    const newPost = await PostModel.create(req.body);
    console.log(req.body);

    res.send({
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
