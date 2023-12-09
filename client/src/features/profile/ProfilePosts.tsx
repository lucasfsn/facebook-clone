import { useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import Post from "../post/Post";
import { getLoading, getUserProfile } from "./profileSlice";

function ProfilePosts() {
  const isLoading = useSelector(getLoading);
  const profile = useSelector(getUserProfile);

  const posts = profile.userPosts.map((post) =>
    (post.user as unknown) === profile._id ? { ...post, user: profile } : post,
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="flex w-full flex-col gap-4">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default ProfilePosts;
