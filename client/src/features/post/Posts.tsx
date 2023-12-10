import { useSelector } from "react-redux";
import Post from "./Post";
import { getAllPosts } from "./postSlice";

function Posts() {
  const posts = useSelector(getAllPosts);

  return (
    <div className="flex w-full flex-col gap-4">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
