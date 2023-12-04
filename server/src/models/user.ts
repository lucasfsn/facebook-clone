import { InferSchemaType, model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true, text: true },
    lastName: { type: String, required: true, trim: true, text: true },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      text: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    picture: {
      type: String,
      default:
        'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png',
    },
    cover: { type: String, trim: true },
    gender: { type: String, required: true, trim: true },
    birthDay: { type: Number, required: true, trim: true },
    birthMonth: { type: Number, required: true, trim: true },
    birthYear: { type: Number, required: true, trim: true },
    verified: { type: Boolean, default: false },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    friendRequests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      secondName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highschool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ['Single', 'Married', 'Divorced', 'In a relationship'],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: Schema.Types.ObjectId,
          ref: 'Post',
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
