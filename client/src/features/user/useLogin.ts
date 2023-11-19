import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginData, login as loginApi } from "../../services/apiAuth";
import { loading, login } from "./userSlice";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function loginUser(user: LoginData) {
    dispatch(loading(true));

    try {
      const { message, loginData } = await loginApi(user);

      dispatch(login(loginData));

      Cookies.set("user", JSON.stringify(loginData));

      toast.success(message);

      navigate("/", { replace: true });
    } catch (err) {
      axios.isAxiosError(err)
        ? toast.error(err.response?.data?.message)
        : toast.error("An unexpected error occurred.");
      dispatch(loading(false));
    }
  }

  return { loginUser };
}
