import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
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

type ChangeUserInfoData = 'firstName' | 'lastName' | 'email';

interface ChangeUserInfoParams {
  data: ChangeUserInfoData;
}

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

interface DeleteUserParams {
  id: string;
}

export const deleteUser: RequestHandler<
  DeleteUserParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

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
