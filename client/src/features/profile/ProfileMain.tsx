import { LuSettings2 } from "react-icons/lu";
import { useSelector } from "react-redux";
import AddPost from "../post/AddPost";
import { getUser } from "../user/userSlice";
import ProfilePosts from "./ProfilePosts";
import { getUserProfile } from "./profileSlice";

function ProfileMain() {
  const user = useSelector(getUser);
  const profile = useSelector(getUserProfile);

  const isProfileOwner = profile?.username === user?.username ? true : false;

  return (
    <div className="text-secondary flex w-full flex-row justify-between gap-4 p-4 lg:mx-auto lg:w-4/6">
      <div className="flex w-1/2 flex-col gap-4">
        <div className="bg-primary flex flex-row items-center justify-between rounded-md px-4 py-2">
          <p className="cursor-pointer text-xl font-bold hover:underline">
            Photos
          </p>
          <div className="bg-tertiary-hover cursor-pointer rounded-md px-2 py-1">
            <span className="text-lg text-blue-400">See all photos</span>
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
        </div>
      </div>
      <div className="flex w-1/2 flex-col gap-4">
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

export default ProfileMain;
