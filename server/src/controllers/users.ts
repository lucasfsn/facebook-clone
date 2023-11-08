import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user';
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

interface SignInBody {
  email?: string;
  password?: string;
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
    });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

export const signIn: RequestHandler<
  unknown,
  unknown,
  SignInBody,
  unknown
> = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user)
      throw createHttpError(
        400,
        'Invalid email. Check your entered data and try again.'
      );

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      throw createHttpError(
        400,
        'Invalid password. Check your entered data and try again.'
      );

    res.send({
      message: 'Signed in successfully',
      id: user._id,
      username: user.username,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};
