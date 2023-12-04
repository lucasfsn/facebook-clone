import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export interface PostData {
  content: string;
  user: string;
}

export interface PostDataWithImages extends PostData {
  images: string[];
}

export async function addPost(post: PostData) {
  const { data } = await axios.post(`${apiUrl}/post/add`, post);

  const { message, ...postData } = data;

  return { message, postData };
}

export async function addImage(formData: FormData) {
  const { data } = await axios.post(`${apiUrl}/image/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return { data };
}
