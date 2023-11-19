import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(
    function () {
      if (!user) navigate("/login");
    },
    [user, navigate],
  );

  if (user) return children;
}

export default ProtectedRoute;
