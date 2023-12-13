import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import PostModel from '../models/post';

interface PostBody {
  content: string;
  images?: string[];
  userId: string;
}

interface DeleteByIdParams {
  id: string;
}

interface CommentBody {
  comment: string;
  image?: string;
  postId: string;
  userId: string;
}

export const createPost: RequestHandler<
  unknown,
  unknown,
  PostBody,
  unknown
> = async (req, res) => {
  try {
    let newPost = await PostModel.create(req.body);
    newPost = await newPost.populate(
      'user',
      'firstName lastName picture username'
    );

    res.json({
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const allPosts: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate('user', 'firstName lastName picture username cover')
      .populate('comments.author', 'firstName lastName picture username')
      .sort({ createdAt: -1 });

    res.json({
      posts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost: RequestHandler<
  DeleteByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id);

    if (!post) throw createHttpError(404, 'Post not found');

    await PostModel.deleteOne({ _id: id });

    const remainingPosts = await PostModel.find();

    res.json({
      posts: remainingPosts,
      message: 'Post has been successfully deleted',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const commentPost: RequestHandler<
  unknown,
  unknown,
  CommentBody,
  unknown
> = async (req, res) => {
  try {
    const { comment, image, postId, userId } = req.body;

    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment,
            image,
            author: userId,
            commentDate: new Date(),
          },
        },
      },
      { new: true }
    ).populate('comments.author', 'picture firstName lastName username');

    res.json({
      message: 'Comment added successfully',
      comments: post.comments,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
