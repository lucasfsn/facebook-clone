import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    dispatch({ type: "user/logout" });

    Cookies.set("user", "");

    toast.success("Logged out successfully");

    navigate("/login");
  }

  return { logout };
}
