import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changePassword as changePasswordApi } from "../../services/apiSettings";
import { changedPassword, error, loading } from "../user/userSlice";

export function useChangePassword() {
  const dispatch = useDispatch();

  async function changePassword(email: string | undefined, password: string) {
    dispatch(loading());

    try {
      if (!email) return;

      const { message } = await changePasswordApi({ email, password });

      dispatch(changedPassword());

      toast.success(message);
    } catch (err) {
      axios.isAxiosError(err) && err.code !== "ERR_NETWORK"
        ? toast.error(err.response?.data.message)
        : toast.error("An unexpected error occurred.");

      dispatch(error());
    }
  }

  return { changePassword };
}
