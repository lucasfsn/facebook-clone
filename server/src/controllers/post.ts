import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import PostModel from '../models/post';
import ReactionModel from '../models/reaction';
import UserModel from '../models/user';

interface PostBody {
  content: string;
  images?: string[];
  userId: string;
}

interface EditPostBody {
  content?: string;
  images?: string[];
  audience?: 'public' | 'friends' | 'private';
}

interface CommentBody {
  comment: string;
  image?: string;
  postId: string;
  userId: string;
}

function getPosts(query: Record<string, unknown>) {
  return PostModel.find(query)
    .populate('user', 'firstName lastName picture username cover')
    .populate('comments.author', 'firstName lastName picture username cover')
    .sort({ createdAt: -1 });
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

    const friendsPostsPromises = friends.map(friend =>
      getPosts({ user: friend, audience: 'friends' })
    );

    const friendsPosts = (await Promise.all(friendsPostsPromises)).flat();

    const publicPosts = await getPosts({ audience: 'public' });

    const userPosts = await getPosts({ user: userId });

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
  { id: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id);

    if (!post) throw createHttpError(404, 'Post not found');

    await ReactionModel.deleteMany({ post: post._id });

    await PostModel.deleteOne({ _id: id });

    res.json({
      deletedPostId: id,
      message: 'Post has been successfully deleted',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const editPost: RequestHandler<
  { id: string },
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

export const deleteComment: RequestHandler<
  { id: string },
  unknown,
  unknown,
  { commentId: string }
> = async (req, res) => {
  try {
    const { id } = req.params;
    const commentId = req.query.commentId;

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    ).populate('comments.author', 'picture firstName lastName username');

    if (!updatedPost) throw createHttpError(404, 'Post not found');

    res.json({
      message: 'Comment deleted successfully',
      comments: updatedPost.comments,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
