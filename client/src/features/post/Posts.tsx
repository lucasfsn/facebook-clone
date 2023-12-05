import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import Spinner from "../../ui/Spinner";
import Post from "./Post";
import { getAllPosts, getLoading, getPosts } from "./postSlice";

function Posts() {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(getAllPosts);
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (isLoading) return <Spinner blur={false} />;

  return (
    <div className="flex w-full flex-col gap-6">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
