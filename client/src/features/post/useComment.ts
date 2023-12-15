import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addImage } from "../../services/apiImages";
import { addComment as addCommentApi } from "../../services/apiPost";
import { AppDispatch } from "../../store";
import { SingleUser } from "../../types/user";
import { ResponseError, handleError, imageToBlob } from "../../utils/helpers";
import { getProfile } from "../profile/profileSlice";
import { addComment as addPostComment, error, loading } from "./postSlice";

export function useComment() {
  const dispatch: AppDispatch = useDispatch();

  async function addComment(
    comment: string,
    image: string,
    postId: string,
    user: SingleUser,
    username?: string,
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

      const { message, comments, idPost } = await addCommentApi(
        postId,
        comment,
        image,
        user.id,
      );

      console.log(username);

      username
        ? dispatch(getProfile(username))
        : dispatch(addPostComment({ idPost, comments }));

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { addComment };
}
