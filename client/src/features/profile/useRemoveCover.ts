import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeCoverPhoto as removeCoverApi } from "../../services/apiProfile";
import { ResponseError, handleError } from "../../utils/helpers";
import { deleteCover, error, loading } from "./profileSlice";

export function useRemoveCover() {
  const dispatch = useDispatch();

  async function removeCover(userId: string) {
    dispatch(loading());

    try {
      const { message } = await removeCoverApi(userId);
      dispatch(deleteCover());

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { removeCover };
}
