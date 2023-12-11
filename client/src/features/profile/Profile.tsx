import { LuSettings2 } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImagesProfile from "../image/ImagesProfile";
import AddPost from "../post/AddPost";
import { getUser } from "../user/userSlice";
import ProfileFriends from "./ProfileFriends";
import ProfileIntro from "./ProfileIntro";
import ProfilePosts from "./ProfilePosts";
import { getUserProfile } from "./profileSlice";

function Profile() {
  const user = useSelector(getUser);
  const profile = useSelector(getUserProfile);

  const isProfileOwner = profile?.username === user?.username ? true : false;

  return (
    <div className="text-secondary flex w-full flex-col justify-between gap-4 p-4 md:flex-row lg:mx-auto xl:w-4/6">
      <div className="flex flex-col gap-4 md:w-1/2">
        <ProfileIntro isProfileOwner={isProfileOwner} />
        <div className="bg-primary flex flex-col gap-3 rounded-md px-4 py-2">
          <div className="flex flex-row items-center justify-between">
            <Link
              to={`/profile/${profile.username}/photos`}
              className="cursor-pointer text-xl font-bold hover:underline"
            >
              Photos
            </Link>
            <Link
              to={`/profile/${profile.username}/photos`}
              className="bg-tertiary-hover cursor-pointer rounded-md px-2 py-1"
            >
              <span className="text-lg text-blue-400">See all photos</span>
            </Link>
          </div>
          <div className="h-fit">
            <ImagesProfile location="profile" space={1.5} />
          </div>
        </div>
        <div className="bg-primary flex flex-col rounded-md px-4 py-2">
          <div className="flex flex-row items-center justify-between">
            <p className="cursor-pointer text-xl font-bold hover:underline">
              Friends
            </p>
            <div className="bg-tertiary-hover cursor-pointer rounded-md px-2 py-1">
              <span className="text-lg text-blue-400">See all friends</span>
            </div>
          </div>
          <span className="text-tertiary text-sm">
            {profile.friends.length}{" "}
            {profile.friends.length === 1 ? "friend" : "friends"}
          </span>
          <div className="h-fit">
            <ProfileFriends />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 overflow-x-hidden md:w-1/2">
        <AddPost>
          {isProfileOwner
            ? "What's on your mind?"
            : `Write something to ${profile.firstName}...`}
        </AddPost>
        <div className="bg-primary flex flex-row items-center justify-between rounded-md px-4 py-2">
          <p className="text-xl font-bold">Posts</p>
          <div className="bg-tertiary bg-tertiary-hover flex cursor-pointer flex-row items-center gap-1.5 rounded-lg p-2 font-semibold">
            <LuSettings2 />
            <span>Filters</span>
          </div>
        </div>
        <ProfilePosts />
      </div>
    </div>
  );
}

export default Profile;
