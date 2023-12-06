import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginData, login as loginApi } from "../../services/apiAuth";
import { error, loading, login } from "./userSlice";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function loginUser(user: LoginData) {
    dispatch(loading());

    try {
      const { message, loginData } = await loginApi(user);

      Cookies.set("user", JSON.stringify(loginData), {
        expires: 1 / 24,
        sameSite: "None",
        secure: true,
      });

      dispatch(login(loginData));

      toast.success(message);

      navigate("/", { replace: true });
    } catch (err) {
      axios.isAxiosError(err) && err.code !== "ERR_NETWORK"
        ? toast.error(err.response?.data.message)
        : toast.error("An unexpected error occurred.");

      dispatch(error());
    }
  }

  return { loginUser };
}
