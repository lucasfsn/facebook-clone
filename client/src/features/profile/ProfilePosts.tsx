import { useSelector } from "react-redux";
import Post from "../post/Post";
import { getUserId } from "../user/userSlice";
import { getUserProfile } from "./profileSlice";

function ProfilePosts() {
  const profile = useSelector(getUserProfile);
  const userId = useSelector(getUserId);

  const isFriend = profile.friends.find((friend) => friend._id === userId);

  const profilePosts = profile.userPosts.filter((post) => {
    if (post.user._id === userId) {
      return true;
    } else if (isFriend && post.audience === "friends") {
      return true;
    } else if (post.audience === "public") {
      return true;
    }
    return false;
  });

  return (
    <div className="flex w-full flex-col gap-4">
      {profilePosts.map((post) => (
        <Post key={post._id} post={post} username={profile.username} />
      ))}
    </div>
  );
}

export default ProfilePosts;
