import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addImage } from "../../services/apiImages";
import { updateCover as updateCoverApi } from "../../services/apiProfile";
import { ResponseError, handleError, imageToBlob } from "../../utils/helpers";
import { useAddPost } from "../post/useAddPost";
import { User } from "../user/userSlice";
import { error, loading, updateProfile } from "./profileSlice";

export function useUpdateCover() {
  const { createPost } = useAddPost();
  const dispatch = useDispatch();

  async function updateCover(image: string, user: User) {
    dispatch(loading());

    try {
      const blobImage = imageToBlob(image);
      const imagePath = `${user.username}/profile/profileCover`;

      const formData = new FormData();

      formData.append("path", imagePath);
      formData.append("file", blobImage);

      const { data } = await addImage(formData);

      const { res } = await updateCoverApi(user.id, data.images[0]);

      await createPost({
        type: "cover",
        content: "",
        images: data.images,
        userId: user.id,
      });

      Cookies.set(
        "user",
        JSON.stringify({
          ...user,
          picture: res.picture,
        }),
      );

      dispatch(updateProfile({ cover: res.cover }));

      toast.success("Your cover has been updated successfully");
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { updateCover };
}
