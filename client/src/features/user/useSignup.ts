import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUpData, signup as signupApi } from "../../services/apiAuth";
import { error, loading, login } from "./userSlice";

export function useSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function signUpUser(user: SignUpData) {
    dispatch(loading());
    try {
      const { message, signUpData } = await signupApi(user);

      Cookies.set("user", JSON.stringify(signUpData), {
        expires: 1 / 24,
        sameSite: "None",
        secure: true,
      });

      dispatch(login(signUpData));

      toast.success(message);

      navigate("/", { replace: true });
    } catch (err) {
      axios.isAxiosError(err) && err.code !== "ERR_NETWORK"
        ? toast.error(err.response?.data.message)
        : toast.error("An unexpected error occurred.");

      dispatch(error());
    }
  }

  return { signUpUser };
}
