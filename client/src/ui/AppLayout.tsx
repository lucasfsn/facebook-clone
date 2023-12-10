import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getLoading, getPosts } from "../features/post/postSlice";
import { AppDispatch } from "../store";
import Header from "./Header";
import Spinner from "./Spinner";

function AppLayout() {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (isLoading) return <Spinner blur={false} />;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-secondary mt-[55px] flex flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
