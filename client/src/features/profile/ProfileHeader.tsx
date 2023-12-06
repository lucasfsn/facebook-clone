import { useRef, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getUser } from "../user/userSlice";
import AddCoverModal from "./AddCoverModal";
import { getUserProfile } from "./profileSlice";

function ProfileHeader() {
  const profile = useSelector(getUserProfile);
  const user = useSelector(getUser);
  const [showAddCover, setShowAddCover] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isProfileOwner = profile?.username === user?.username ? true : false;

  function handleShowCover() {
    setShowAddCover((show) => !show);
  }

  return (
    <div className="text-secondary flex w-full flex-col shadow-md">
      <div className="flex flex-row">
        <div className="bg-primary flex w-full flex-col gap-2">
          <div className="h-[300px]">
            {profile?.cover ? (
              <img src={profile.cover} />
            ) : (
              <div className="bg-secondary flex h-full w-full justify-end shadow-3xl lg:mx-auto lg:w-4/6 lg:rounded-b-lg">
                {isProfileOwner && (
                  <div className="relative self-end px-4 py-2">
                    <button
                      onClick={handleShowCover}
                      className="flex flex-row items-center gap-1.5 self-end rounded-md bg-black bg-opacity-60 px-3 py-1.5 text-white hover:bg-opacity-70 active:text-[0.95rem]"
                      ref={buttonRef}
                    >
                      <FaCamera />
                      <span>Add cover photo</span>
                    </button>
                    {showAddCover && (
                      <AddCoverModal
                        button={buttonRef}
                        close={() => setShowAddCover(false)}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-row items-center px-3 lg:mx-auto lg:w-4/6">
            <div className="relative h-[110px]">
              <div className="bg-primary -translate-y-1/2 cursor-pointer rounded-full p-1">
                <img
                  className="h-[160px] min-w-[160px] rounded-full"
                  src={profile?.picture}
                  alt="profile"
                />
                <div className="bg-tertiary bg-tertiary-hover absolute bottom-3 right-3 cursor-pointer rounded-full p-2 text-xl">
                  <FaCamera />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-tertiary text-sm font-semibold">
                {profile.friends.length}{" "}
                {profile.friends.length === 1 ? "friend" : "friends"}
              </p>
            </div>
            {isProfileOwner && (
              <div className="ml-auto p-2">
                <button className="bg-tertiary text-secondary bg-tertiary-hover flex flex-row items-center justify-center gap-2 rounded-lg px-3 py-1.5 font-semibold">
                  <FaPencilAlt />
                  <span>Edit Profile</span>
                </button>
              </div>
            )}
          </div>
          <div className="px-3 lg:mx-auto lg:w-4/6">
            <div className="separator flex flex-row gap-3 border-t py-1">
              <div className="bg-tertiary-hover text-secondary cursor-pointer rounded-md p-3 font-semibold">
                Posts
              </div>
              <div className="bg-tertiary-hover text-secondary cursor-pointer rounded-md p-3 font-semibold">
                Friends
              </div>
              <div className="bg-tertiary-hover text-secondary cursor-pointer rounded-md p-3 font-semibold">
                Photos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
