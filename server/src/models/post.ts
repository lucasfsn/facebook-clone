import { InferSchemaType, model, Schema } from 'mongoose';

const postSchema = new Schema(
  {
    type: { type: String, enum: ['profile', 'cover', null], default: null },
    images: { type: Array },
    content: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [
      {
        comment: { type: String },
        image: { type: String },
        by: { type: Schema.Types.ObjectId, ref: 'User' },
        commentDate: { type: Date, default: new Date() },
      },
    ],
  },
  { timestamps: true }
);

type Post = InferSchemaType<typeof postSchema>;

export default model<Post>('Post', postSchema);
