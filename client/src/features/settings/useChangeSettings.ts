import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changeSettings as changeSettingsApi } from "../../services/apiSettings";
import { loading, settingsChanged } from "../user/userSlice";

export function useChangeSettings() {
  const dispatch = useDispatch();

  async function changeSettings(
    email: string | undefined,
    field: "firstName" | "lastName" | "email",
    value: string,
  ) {
    dispatch(loading(true));
    try {
      if (!email) return;

      const { message, newValue } = await changeSettingsApi({
        email,
        field,
        value,
      });

      dispatch(settingsChanged({ field, value: newValue }));

      toast.success(message);
    } catch (err) {
      axios.isAxiosError(err) && err.code !== "ERR_NETWORK"
        ? toast.error(err.response?.data.message)
        : toast.error("An unexpected error occurred.");

      dispatch(loading(false));
    }
  }

  return { changeSettings };
}
