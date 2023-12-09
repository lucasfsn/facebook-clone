import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateUserDetails as updateUserDetailsApi } from "../../services/apiProfile";
import { ResponseError, handleError } from "../../utils/helpers";
import { useAddPost } from "../post/useAddPost";
import { Details, error, loading, updateProfile } from "./profileSlice";

export function useDetails() {
  const { createDetailsPost } = useAddPost();
  const dispatch = useDispatch();

  async function updateDetails(
    updatedDetail: keyof Details,
    details: Details,
    userId: string,
  ) {
    dispatch(loading());

    try {
      const { updatedUser, message } = await updateUserDetailsApi(
        details,
        userId,
      );

      dispatch(updateProfile({ details: updatedUser.details }));

      await createDetailsPost({
        type: "details",
        content: `${details[updatedDetail]}`,
        images: [],
        userId: updatedUser._id,
        key: updatedDetail,
      });

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { updateDetails };
}
