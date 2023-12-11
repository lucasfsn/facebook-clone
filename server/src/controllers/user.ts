import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import UserModel, { User } from '../models/user';
import { generateUsername } from '../utils/generateUsername';
import { validateEmail, validateName } from '../utils/validateUserData';

interface SignUpBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
  gender?: string;
}

interface LogInBody {
  email?: string;
  password?: string;
}

interface ChangePasswordBody {
  email: string;
  password: string;
}

interface ChangeUserInfoBody {
  email: string;
  value: string;
}

interface ChangeProfileImageBody {
  userId: string;
  image: string;
}

interface GetUserProfileParams {
  username: string;
}

type ChangeUserInfoData = 'firstName' | 'lastName' | 'email';

interface ChangeUserInfoParams {
  data: ChangeUserInfoData;
}

interface DeleteByIdParams {
  id: string;
}

interface UpdateUserDetailsBody {
  details: {
    bio?: string;
    workplace?: string;
    highschool?: string;
    college?: string;
    currentCity?: string;
    homeTown?: string;
    relationship?: string;
  };
  userId: string;
}

interface FriendRequestParams {
  id: string;
}

interface FriendRequestBody {
  userId: string;
}

interface DeleteQueryParams {
  userId: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    birthDay,
    birthMonth,
    birthYear,
    gender,
  } = req.body;

  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !password ||
      !birthDay ||
      !birthMonth ||
      !birthYear ||
      !gender
    )
      throw createHttpError(400, 'Parameters missing');

    if (!validateName(firstName) || !validateName(lastName))
      throw createHttpError(400, 'Invalid first name or last name');

    if (!validateEmail(email)) throw createHttpError(400, 'Invalid email');

    const existingEmail = await UserModel.findOne({ email: email }).exec();

    if (existingEmail)
      throw createHttpError(
        409,
        'A user with this email address already exists. Please choose a different one or log in instead.'
      );

    const passwordHashed = await bcrypt.hash(password, 10);

    const generatedUsername = await generateUsername(firstName.toLowerCase());

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: passwordHashed,
      username: generatedUsername,
      birthDay,
      birthMonth,
      birthYear,
      gender,
    });

    res.send({
      message: 'Signed up successfully',
      id: newUser._id,
      username: newUser.username,
      picture: newUser.picture,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  LogInBody,
  unknown
> = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user)
      throw createHttpError(
        400,
        'Invalid email. Check your data and try again.'
      );

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      throw createHttpError(
        401,
        'Invalid password. Check your data and try again.'
      );

    res.send({
      message: 'Logged in successfully',
      id: user._id,
      username: user.username,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const changePassword: RequestHandler<
  unknown,
  unknown,
  ChangePasswordBody,
  unknown
> = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword)
      throw createHttpError(
        400,
        'Please choose a different password than your current one.'
      );

    const passwordHashed = await bcrypt.hash(password, 10);

    user.password = passwordHashed;

    await user.save();

    res.send({
      message: `Your password has been changed successfully`,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const changeUserInfo: RequestHandler<
  ChangeUserInfoParams,
  unknown,
  ChangeUserInfoBody,
  unknown
> = async (req, res) => {
  function checkIfNotSame(user: User, field: ChangeUserInfoData, val: string) {
    if (user[field] === val)
      throw createHttpError(
        400,
        `Please choose a different ${field
          .replace(/([A-Z])/, ' $1')
          .toLowerCase()} than your current one.`
      );
  }

  try {
    const { email, value } = req.body;
    const { data } = req.params;

    const user = await UserModel.findOne({ email });

    checkIfNotSame(user, data, value);

    if (data === 'firstName' && !validateName(value))
      throw createHttpError(
        400,
        'Invalid first name. Check your data and try again.'
      );

    if (data === 'lastName' && !validateName(value))
      throw createHttpError(
        400,
        'Invalid last name. Check your data and try again.'
      );

    if (data === 'email') {
      if (!validateEmail(value))
        throw createHttpError(
          400,
          'Invalid email. Check your data and try again.'
        );

      const emailExists = await UserModel.findOne({ email: value });

      if (emailExists)
        throw createHttpError(
          400,
          'This email is already in use. Please choose a different email.'
        );
    }

    user[data] = value;

    await user.save();

    const message = `Your ${
      data !== 'email' ? data.replace(/([A-Z])/, ' $1').toLowerCase() : data
    } has been changed successfully`;

    res.send({
      message,
      [data]: value,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const deleteUser: RequestHandler<
  DeleteByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) throw createHttpError(404, 'User not found');

    await UserModel.deleteOne({ _id: id });

    res.send({
      message: 'Your account has been deleted successfully',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getUserProfile: RequestHandler<
  GetUserProfileParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username });

    if (!user) throw createHttpError(404, 'User not found');

    const userWithPosts = await UserModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(user._id) },
      },
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'user',
          as: 'userPosts',
        },
      },
      {
        $lookup: {
          from: 'posts',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$user', '$$userId'],
                },
              },
            },
            {
              $sort: { createdAt: -1 },
            },
          ],
          as: 'userPosts',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'friends',
          foreignField: '_id',
          as: 'friends',
        },
      },
      {
        $project: {
          password: 0,
          'friends.gender': 0,
          'friends.friends': 0,
          'friends.password': 0,
          'friends.email': 0,
          'friends.__v': 0,
          'friends.friendRequests': 0,
          'friends.search': 0,
          'friends.savedPosts': 0,
          'friends.createdAt': 0,
          'friends.updatedAt': 0,
          'friends.details': 0,
          'friends.cover': 0,
          'friends.sentFriendRequests': 0,
          'friends.userPosts': 0,
          'friends.birthDay': 0,
          'friends.birthMonth': 0,
          'friends.birthYear': 0,
        },
      },
    ]);

    res.json(...userWithPosts);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const updateProfileImage: RequestHandler<
  DeleteByIdParams,
  unknown,
  ChangeProfileImageBody,
  unknown
> = async (req, res) => {
  try {
    const { userId, image } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        picture: image,
      },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const updateCoverImage: RequestHandler<
  unknown,
  unknown,
  ChangeProfileImageBody,
  unknown
> = async (req, res) => {
  try {
    const { userId, image } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        cover: image,
      },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const removeCoverPhoto: RequestHandler<
  DeleteByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;

    await UserModel.findByIdAndUpdate(id, {
      cover: '',
    });

    res.json({ message: 'Cover photo removed successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const removeProfilePicture: RequestHandler<
  DeleteByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        picture: UserModel.schema.path('picture').options.default,
      },
      { new: true }
    );

    res.json({ user, message: 'Profile picture removed successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const updateDetails: RequestHandler<
  unknown,
  unknown,
  UpdateUserDetailsBody,
  unknown
> = async (req, res) => {
  try {
    const { details, userId } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        details,
      },
      { new: true }
    );

    res.json({ user, message: 'Profile details updated successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const addFriend: RequestHandler<
  FriendRequestParams,
  unknown,
  FriendRequestBody,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (id === userId)
      throw createHttpError(400, 'You cannot add yourself as a friend');

    const receiver = await UserModel.findById(id);
    const user = await UserModel.findById(userId);

    if (user.friends.includes(receiver._id))
      throw createHttpError(400, 'This user is already your friend');

    if (user.friendRequests.includes(receiver._id))
      throw createHttpError(400, 'This user has already sent you a request');

    if (receiver.friendRequests.includes(user._id))
      throw createHttpError(
        400,
        'You have already sent a friend request to this user'
      );

    await user.updateOne({
      $push: { sentFriendRequests: receiver._id },
    });

    await receiver.updateOne({
      $push: { friendRequests: user._id },
    });

    res.json({ message: 'Friend request has been sent successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const cancelFriendRequest: RequestHandler<
  FriendRequestParams,
  unknown,
  FriendRequestBody,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (id === userId)
      throw createHttpError(
        400,
        'You cannot cancel a friend request to yourself'
      );

    const user = await UserModel.findById(userId);
    const receiver = await UserModel.findById(id);

    if (user.friends.includes(receiver._id))
      throw createHttpError(400, 'This user is already your friend');

    if (!receiver.friendRequests.includes(user._id))
      throw createHttpError(
        400,
        'You have not sent a friend request to this user'
      );

    await user.updateOne({
      $pull: { sentFriendRequests: receiver._id },
    });

    await receiver.updateOne({
      $pull: { friendRequests: user._id },
    });

    res.json({ message: 'Friend request has been cancelled successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const acceptFriendRequest: RequestHandler<
  FriendRequestParams,
  unknown,
  FriendRequestBody,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (id === userId)
      throw createHttpError(
        400,
        'You cannot accept a friend request from yourself'
      );

    const user = await UserModel.findById(userId);
    const sender = await UserModel.findById(id);

    if (sender.friends.includes(user._id))
      throw createHttpError(400, 'This user is already your friend');

    if (!sender.sentFriendRequests.includes(user._id))
      throw createHttpError(
        400,
        'This user has already canceled friend request'
      );

    await user.updateOne({
      $pull: { friendRequests: sender._id },
      $push: { friends: sender._id },
    });

    await sender.updateOne({
      $push: { friends: user._id },
      $pull: { sentFriendRequests: user._id },
    });

    res.json({ message: 'Friend request has been accepted successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const removeFriend: RequestHandler<
  FriendRequestParams,
  unknown,
  unknown,
  DeleteQueryParams
> = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId;

    if (id === userId)
      throw createHttpError(400, "You can't unfriend yourself");

    const user = await UserModel.findById(userId);
    const friend = await UserModel.findById(id);

    if (
      !user.friends.includes(friend._id) &&
      !friend.friends.includes(user._id)
    )
      throw createHttpError(400, 'This user is not in your friend list');

    await friend.updateOne({ $pull: { friends: user._id } });
    await user.updateOne({ $pull: { friends: friend._id } });

    res.json({
      message: 'User has been removed from your friend list successfully',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const removeFriendRequest: RequestHandler<
  FriendRequestParams,
  unknown,
  unknown,
  DeleteQueryParams
> = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId;

    if (id === userId)
      throw createHttpError(400, "You can't delete a request from yourself");

    const user = await UserModel.findById(userId);
    const sender = await UserModel.findById(id);

    if (!user.friendRequests.includes(sender._id))
      throw createHttpError(
        400,
        'This user has already canceled friend request'
      );

    if (!sender.sentFriendRequests.includes(user._id))
      throw createHttpError(
        400,
        'This user has already canceled friend request'
      );

    await user.updateOne({ $pull: { friendRequests: sender._id } });
    await sender.updateOne({ $pull: { sentFriendRequests: user._id } });

    res.json({
      message: 'Friend request has been deleted successfully',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
