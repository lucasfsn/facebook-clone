import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import ReactionModel from '../models/reaction';

type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

interface AddReactionBody {
  reaction: ReactionType;
  postId: string;
  userId: string;
}

interface GetReactionParams {
  postId: string;
  userId: string;
}

export const addReaction: RequestHandler<
  unknown,
  unknown,
  AddReactionBody,
  unknown
> = async (req, res) => {
  try {
    const { reaction, postId, userId } = req.body;

    const hasReaction = await ReactionModel.findOne({
      post: postId,
      by: new mongoose.Types.ObjectId(userId),
    });

    if (hasReaction) {
      console.log(hasReaction);
      hasReaction.reaction === reaction
        ? await ReactionModel.findByIdAndDelete(hasReaction._id)
        : await ReactionModel.findByIdAndUpdate(hasReaction._id, { reaction });
    } else {
      await ReactionModel.create({
        reaction,
        post: postId,
        by: userId,
      });
    }

    res.json({
      message: 'Reaction added successfully',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

interface Reaction {
  _id: mongoose.Types.ObjectId;
  reaction: ReactionType | undefined;
  post: mongoose.Types.ObjectId;
  by: mongoose.Types.ObjectId;
}

interface Reactions {
  [key: string]: Reaction[];
}

export const getReaction: RequestHandler<
  GetReactionParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const reactions = await ReactionModel.find({ post: postId });

    const reactionsObj = reactions.reduce((prev: Reactions, curr) => {
      if (!prev[curr.reaction]) prev[curr.reaction] = [];

      prev[curr.reaction].push(curr as Reaction);
      return prev;
    }, {});

    const reactionsWithCount = [
      'like',
      'love',
      'care',
      'haha',
      'wow',
      'sad',
      'angry',
    ]
      .map(reaction => ({
        reaction,
        count: reactionsObj[reaction]?.length || 0,
      }))
      .sort((a, b) => b.count - a.count);

    const userReaction = await ReactionModel.findOne({
      post: postId,
      by: userId,
    });

    res.json({
      reactions: reactionsWithCount,
      userReaction: userReaction?.reaction,
      reactionsCount: reactions.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
