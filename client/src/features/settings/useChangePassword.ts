import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changePassword as changePasswordApi } from "../../services/apiSettings";
import { loading, passwordChanged } from "../user/userSlice";

export function useChangePassword() {
  const dispatch = useDispatch();

  async function changePassword(email: string | undefined, password: string) {
    dispatch(loading(true));
    try {
      if (!email) return;

      dispatch(passwordChanged());

      const { message } = await changePasswordApi({ email, password });

      toast.success(message);
    } catch (err) {
      axios.isAxiosError(err) && err.code !== "ERR_NETWORK"
        ? toast.error(err.response?.data.message)
        : toast.error("An unexpected error occurred.");

      dispatch(loading(false));
    }
  }

  return { changePassword };
}
