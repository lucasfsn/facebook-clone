import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  PostData,
  addImage,
  addPost as addPostApi,
} from "../../services/apiPost";
import { imageToBlob } from "../../utils/helpers";
import { addPost, error, loading } from "./postSlice";

export function useAddPost() {
  const dispatch = useDispatch();

  async function createPostWithImages(post: PostData, username: string) {
    if (!post.images) return;

    dispatch(loading());

    try {
      const { images } = post;

      const blobImages = images.map((image) => imageToBlob(image));
      const imagePath = `${username}/posts/images`;

      const formData = new FormData();
      formData.append("path", imagePath);

      blobImages.forEach((blobImage) => {
        formData.append("file", blobImage);
      });

      const { data } = await addImage(formData);

      await createPost({ ...post, images: data.images });
    } catch (err) {
      axios.isAxiosError(err) &&
      err.code !== "ERR_NETWORK" &&
      err.code !== "ERR_BAD_REQUEST"
        ? toast.error(err.response?.data.message)
        : toast.error("An unexpected error occurred");

      dispatch(error());
    }
  }

  async function createPost(post: PostData) {
    dispatch(loading());

    try {
      const { message, postData } = await addPostApi(post);

      dispatch(addPost(postData));

      toast.success(message);
    } catch (err) {
      axios.isAxiosError(err) &&
      err.code !== "ERR_NETWORK" &&
      err.code !== "ERR_BAD_REQUEST"
        ? toast.error(err.response?.data.message)
        : toast.error("An unexpected error occurred");

      dispatch(error());
    }
  }

  return { createPostWithImages, createPost };
}
