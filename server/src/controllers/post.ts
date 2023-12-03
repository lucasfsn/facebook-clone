import { RequestHandler } from 'express';
import PostModel from '../models/post';

// interface PostBody {
//   email?: string;
//   password?: string;
// }

export const createPost: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const newPost = await PostModel.create(req.body);
    res.send({
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
