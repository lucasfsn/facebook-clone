import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addImage } from "../../services/apiImages";
import { updateProfilePicture as updateProfilePictureApi } from "../../services/apiProfile";
import { ResponseError, handleError, imageToBlob } from "../../utils/helpers";
import { useAddPost } from "../post/useAddPost";
import { User, changedProfilePicture } from "../user/userSlice";
import { error, loading, updatedProfilePicture } from "./profileSlice";

export function useUpdateProfilePicture() {
  const { createPost } = useAddPost();
  const dispatch = useDispatch();

  async function updateProfilePicture(
    image: string,
    user: User,
    description: string,
  ) {
    dispatch(loading());

    try {
      const blobImage = imageToBlob(image);
      const imagePath = `${user.username}/profile/profilePicture`;

      const formData = new FormData();

      formData.append("path", imagePath);
      formData.append("file", blobImage);

      const { data } = await addImage(formData);

      const { res } = await updateProfilePictureApi(user.id, data.images[0]);

      await createPost({
        type: "profile",
        content: description,
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

      dispatch(updatedProfilePicture(res.picture));
      dispatch(changedProfilePicture(res.picture));

      toast.success("Profile picture updated successfully");
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { updateProfilePicture };
}
