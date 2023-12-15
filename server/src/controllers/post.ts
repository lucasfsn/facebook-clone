import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import PostModel from '../models/post';
import UserModel from '../models/user';

interface PostBody {
  content: string;
  images?: string[];
  userId: string;
}

interface DeleteByIdParams {
  id: string;
}

interface EditPostBody {
  content?: string;
  images?: string[];
  audience?: 'public' | 'friends' | 'private';
}

interface EditPostParams {
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
  { userId: string }
> = async (req, res) => {
  try {
    const userId = req.query.userId;
    const { friends } = await UserModel.findById(userId).select('friends');

    const friendsPostsPromises = friends.map(friend => {
      return PostModel.find({ user: friend, audience: 'friends' })
        .populate('user', 'firstName lastName picture username cover')
        .populate(
          'comments.author',
          'firstName lastName picture username cover'
        )
        .sort({ createdAt: -1 });
    });

    const friendsPosts = (await Promise.all(friendsPostsPromises)).flat();

    const publicPosts = await PostModel.find({ audience: 'public' })
      .populate('user', 'firstName lastName picture username cover')
      .populate('comments.author', 'firstName lastName picture username')
      .sort({ createdAt: -1 });

    const userPosts = await PostModel.find({ user: userId })
      .populate('user', 'firstName lastName picture username cover')
      .populate('comments.author', 'firstName lastName picture username')
      .sort({ createdAt: -1 });

    const posts = [...friendsPosts, ...publicPosts, ...userPosts]
      .filter(
        (post, index, self) => index === self.findIndex(p => p.id === post.id)
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

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

export const editPost: RequestHandler<
  EditPostParams,
  unknown,
  EditPostBody,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, images, audience } = req.body;

    const post = await PostModel.findById(id).select('content images audience');
    if (!post) throw createHttpError(404, 'Post not found');

    if (content) post.content = content;
    if (images) post.images = images;
    if (audience) post.audience = audience;

    const updatedPost = await post.save();

    res.json({
      message: 'Post updated successfully',
      post: updatedPost,
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
      postId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
