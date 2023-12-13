import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import Post from "./Post";
import { getAllPosts, getPosts } from "./postSlice";

function Posts() {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(getAllPosts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, posts.length]);

  return (
    <div className="flex w-full flex-col gap-4">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
