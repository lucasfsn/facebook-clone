import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUpData, signup as signupApi } from "../../services/apiAuth";
import { loading, login } from "./userSlice";

export function useSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function signUpUser(user: SignUpData) {
    dispatch(loading(true));
    try {
      const { message, signUpData } = await signupApi(user);

      dispatch(login(signUpData));

      Cookies.set("user", JSON.stringify(signUpData));

      toast.success(message);

      navigate("/", { replace: true });
    } catch (err) {
      axios.isAxiosError(err)
        ? toast.error(err.response?.data?.message)
        : toast.error("An unexpected error occurred.");

      dispatch(loading(false));
    }
  }

  return { signUpUser };
}
