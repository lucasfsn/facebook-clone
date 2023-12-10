import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addImage } from "../../services/apiImages";
import { PostData, addPost as addPostApi } from "../../services/apiPost";
import { ResponseError, handleError, imageToBlob } from "../../utils/helpers";
import { addPost, error, loading } from "./postSlice";

export function useAddPost() {
  const dispatch = useDispatch();

  async function createPostWithImages(post: PostData, username: string) {
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
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function createPost(post: PostData, addedImage: boolean = false) {
    dispatch(loading());

    try {
      const { message, postData } = await addPostApi(post);

      dispatch(addPost(postData));

      if (!addedImage) toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function createDetailsPost(post: PostData) {
    dispatch(loading());

    try {
      const { postData } = await addPostApi(post);

      dispatch(addPost(postData));
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { createPostWithImages, createPost, createDetailsPost };
}
