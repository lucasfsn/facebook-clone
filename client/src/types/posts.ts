export interface PostAuthor {
  _id: string;
  picture: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface SingleComment {
  _id: string;
  comment: string;
  image: string;
  author: PostAuthor;
  commentDate: Date;
}

export interface PostOwner {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  picture: string;
  cover: string;
}

export interface SinglePost {
  _id: string;
  type: "profile" | "cover" | "post" | "details";
  images: string[];
  content: string;
  user: PostOwner;
  comments: SingleComment[];
  createdAt: string;
  updatedAt: Date;
  key?: string;
}

export interface SingleReaction {
  reaction: ReactionType;
  count: number;
}

export interface AddPostData {
  type: "profile" | "cover" | "post" | "details";
  content: string;
  userId: string;
  images: string[];
  key?: string;
}

export type ReactionType = "like" | "love" | "haha" | "wow" | "sad" | "angry";
