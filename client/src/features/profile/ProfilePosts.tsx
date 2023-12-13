import { useSelector } from "react-redux";
import { PostOwner } from "../../types/posts";
import Post from "../post/Post";
import { getUserProfile } from "./profileSlice";

function ProfilePosts() {
  const profile = useSelector(getUserProfile);

  const profilePosts = profile.userPosts.map((post) => ({
    ...post,
    user: profile as PostOwner,
  }));

  return (
    <div className="flex w-full flex-col gap-4">
      {profilePosts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default ProfilePosts;
