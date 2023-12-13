import { SinglePost } from "./posts";

export type RelationshipType =
  | "Single"
  | "Married"
  | "Divorced"
  | "In a relationship"
  | "Engaged"
  | "Separated"
  | "Widowed";

export interface Details {
  bio?: string;
  workplace?: string;
  highschool?: string;
  college?: string;
  currentCity?: string;
  hometown?: string;
  relationship?: RelationshipType;
}

export interface Friend {
  _id: string;
  firstName: string;
  lastName: string;
  picture: string;
  username: string;
  friends?: string[];
}

export interface SingleProfile {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  picture: string;
  cover?: string;
  gender: string;
  birdthDay: number;
  birdthMonth: number;
  birdthYear: number;
  friends: Friend[];
  friendRequests: string[];
  sentFriendRequests: string[];
  search: string[];
  details: Details;
  savedPosts: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  userPosts: SinglePost[];
  images: string[];
}
