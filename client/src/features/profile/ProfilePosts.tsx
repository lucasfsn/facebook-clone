import { useSelector } from "react-redux";
import Post from "../post/Post";
import { getAllPosts } from "../post/postSlice";
import { getUserProfile } from "./profileSlice";

function ProfilePosts() {
  const profile = useSelector(getUserProfile);
  const posts = useSelector(getAllPosts);

  const profilePosts = posts.filter((post) => post.user._id === profile._id);

  return (
    <div className="flex w-full flex-col gap-4">
      {profilePosts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default ProfilePosts;
