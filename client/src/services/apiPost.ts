import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export interface PostData {
  type: "profile" | "cover" | "post" | "details";
  content: string;
  userId: string;
  images: string[];
  key?: string;
}

export async function addPost(post: PostData) {
  const { data } = await axios.post(`${apiUrl}/post/add`, {
    ...post,
    user: post.userId,
  });

  const { message, ...postData } = data;

  return { message, postData };
}

export async function getPosts() {
  const { data } = await axios.get(`${apiUrl}/post/all`);

  return { data };
}

export async function deletePost(id: string) {
  const { data } = await axios.delete(`${apiUrl}/post/delete/${id}`);

  const { posts, message } = data;

  return { posts, message };
}
