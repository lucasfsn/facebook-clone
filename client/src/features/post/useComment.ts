import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addImage } from "../../services/apiImages";
import { addComment as addCommentApi } from "../../services/apiPost";
import { AppDispatch } from "../../store";
import { ResponseError, handleError, imageToBlob } from "../../utils/helpers";
import { getProfile } from "../profile/profileSlice";
import { User } from "../user/userSlice";
import {
  addComment as addPostComment,
  error,
  getPosts,
  loading,
} from "./postSlice";

export function useComment() {
  const dispatch: AppDispatch = useDispatch();

  async function addComment(
    comment: string,
    image: string,
    postId: string,
    user: User,
  ) {
    dispatch(loading());

    try {
      if (image) {
        const blobImage = imageToBlob(image);
        const imagePath = `${user.username}/posts/${postId}`;

        const formData = new FormData();

        formData.append("path", imagePath);
        formData.append("file", blobImage);

        const { data } = await addImage(formData);
        image = data.images[0];
      }

      const { message, comments } = await addCommentApi(
        postId,
        comment,
        image,
        user.id,
      );

      dispatch(addPostComment(comments));
      dispatch(getPosts());
      dispatch(getProfile(user.username));

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { addComment };
}
