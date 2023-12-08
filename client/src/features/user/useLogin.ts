import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginData, login as loginApi } from "../../services/apiAuth";
import { ResponseError, handleError } from "../../utils/helpers";
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
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { loginUser };
}
