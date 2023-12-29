import axios from "axios";
import { AddPostData, ReactionType, SinglePost } from "../types/posts";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function addPost(post: AddPostData) {
  const { data } = await axios.post(`${apiUrl}/post/add`, {
    ...post,
    user: post.userId,
  });

  const { message, ...postData } = data;

  return { message, postData };
}

export async function getPosts(userId: string) {
  const { data } = await axios.get(`${apiUrl}/post/all`, {
    params: { userId },
  });

  return { data };
}

export async function deletePost(id: string) {
  const { data } = await axios.delete(`${apiUrl}/post/${id}`);

  const { deletedPostId, message } = data;

  return { deletedPostId, message };
}

export async function addComment(
  postId: string,
  comment: string,
  image: string,
  userId: string,
) {
  const { data } = await axios.post(`${apiUrl}/post/comment`, {
    comment,
    image,
    postId,
    userId,
  });

  const { message, comments } = data;

  return { message, comments, idPost: postId };
}

export async function addReaction(
  reaction: ReactionType,
  postId: string,
  userId: string,
) {
  await axios.post(`${apiUrl}/reaction/add`, {
    reaction,
    postId,
    userId,
  });
}

export async function getReactions(postId: string, userId: string) {
  const { data } = await axios.get(
    `${apiUrl}/reaction/get/${postId}/${userId}`,
  );
  return {
    reactions: data.reactions,
    userReaction: data.userReaction,
    reactionsCount: data.reactionsCount,
  };
}

export async function editPost(
  postId: string,
  editedPost: Partial<SinglePost>,
) {
  const { data } = await axios.put(`${apiUrl}/post/edit/${postId}`, {
    ...editedPost,
  });

  return { updatedPost: data.post, message: data.message };
}

export async function deleteComment(postId: string, commentId: string) {
  const { data } = await axios.delete(`${apiUrl}/post/comment/${postId}`, {
    params: { commentId },
  });

  return { comments: data.comments, message: data.message };
}
