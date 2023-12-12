import { InferSchemaType, model, Schema } from 'mongoose';

const postSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['profile', 'cover', 'post', 'details'],
      default: 'post',
    },
    images: { type: Array },
    content: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    key: { type: String },
    comments: [
      {
        comment: { type: String },
        image: { type: String },
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        commentDate: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

type Post = InferSchemaType<typeof postSchema>;

export default model<Post>('Post', postSchema);
