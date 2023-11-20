import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../features/user/userSlice";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const user = useSelector(getUser);

  useEffect(
    function () {
      if (!user) navigate("/login");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  );

  if (user) return children;
}

export default ProtectedRoute;
