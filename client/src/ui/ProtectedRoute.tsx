import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoading, getUser } from "../features/user/userSlice";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);

  useEffect(
    function () {
      if (!isLoading && !user) navigate("/login");
    },
    [user, isLoading, navigate],
  );

  if (user) return children;
}

export default ProtectedRoute;
