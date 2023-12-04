import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount as deleteAccountApi } from "../../services/apiSettings";
import { deleteUser, error, loading } from "../user/userSlice";

export function useDelete() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function deleteAccount(id: string) {
    dispatch(loading());

    try {
      const { message } = await deleteAccountApi(id);

      dispatch(deleteUser());

      Cookies.remove("user");

      toast.success(message);

      navigate("/login");
    } catch (err) {
      axios.isAxiosError(err) && err.code !== "ERR_NETWORK"
        ? toast.error(err.response?.data.message)
        : toast.error("An unexpected error occurred.");

      dispatch(error());
    }
  }

  return { deleteAccount };
}
