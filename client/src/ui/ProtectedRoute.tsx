import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { user: isAuthenticated } = useSelector((state: RootState) => ({
    ...state,
  }));

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated, navigate],
  );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
