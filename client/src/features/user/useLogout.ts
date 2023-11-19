import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./userSlice";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());

    Cookies.remove("user");

    toast.success("Logged out successfully");

    navigate("/login");
  }

  return { logoutUser };
}
