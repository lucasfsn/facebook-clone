import { useEffect, useRef, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import Modal from "../../ui/Modal";
import { getUser } from "../user/userSlice";
import AddCoverModal from "./AddCoverModal";
import AddProfilePicture from "./AddProfilePicture";
import ProfilePictureModal from "./ProfilePictureModal";
import { getUserProfile } from "./profileSlice";

function ProfileHeader() {
  const { isDarkMode } = useDarkMode();
  const location = useLocation();

  const profile = useSelector(getUserProfile);
  const user = useSelector(getUser);

  const [activePage, setActivePage] = useState<"home" | "friends" | "photos">(
    "home",
  );
  const [showAddCover, setShowAddCover] = useState<boolean>(false);
  const [showProfilePictureModal, setShowProfilePictureModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (location.pathname.includes("/photos")) {
      setActivePage("photos");
    } else if (location.pathname.includes("/friends")) {
      setActivePage("friends");
    } else {
      setActivePage("home");
    }
  }, [location.pathname]);

  const coverBtnRef = useRef<HTMLButtonElement>(null);
  const profilePictureRef = useRef<HTMLImageElement>(null);

  const isProfileOwner = profile?.username === user?.username ? true : false;

  function handleShowCover() {
    setShowAddCover((show) => !show);
  }

  function handleShowProfilePictureModal() {
    setShowProfilePictureModal((show) => !show);
  }

  return (
    <div className="text-secondary flex w-full flex-col shadow-md">
      <div className="flex flex-row">
        <div className="bg-primary flex w-full flex-col gap-2">
          <div className="h-[300px]">
            {profile?.cover ? (
              <img src={profile.cover} />
            ) : (
              <div
                className={`flex h-full w-full justify-end bg-gradient-to-t shadow-3xl xl:mx-auto xl:w-4/6 xl:rounded-b-lg ${
                  isDarkMode
                    ? "from-black via-neutral-950 to-neutral-900"
                    : "from-gray-400 via-gray-100 to-white"
                }`}
              >
                {isProfileOwner && (
                  <div className="relative self-end px-4 py-2">
                    <button
                      onClick={handleShowCover}
                      className="flex flex-row items-center gap-1.5 self-end rounded-md bg-black bg-opacity-60 px-3 py-1.5 text-white hover:bg-opacity-70 active:text-[0.95rem]"
                      ref={coverBtnRef}
                    >
                      <FaCamera />
                      <span>Add cover photo</span>
                    </button>
                    {showAddCover && (
                      <AddCoverModal
                        button={coverBtnRef}
                        close={() => setShowAddCover(false)}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-row items-center px-3 xl:mx-auto xl:w-4/6">
            <div className="relative h-[110px]">
              <div className="bg-primary relative -translate-y-1/2 cursor-pointer rounded-full p-1">
                {showProfilePictureModal && (
                  <ProfilePictureModal
                    button={profilePictureRef}
                    close={() => setShowProfilePictureModal(false)}
                  />
                )}
                <img
                  className="h-[160px] min-w-[160px] rounded-full hover:brightness-105"
                  src={profile?.picture}
                  alt="profile"
                  ref={profilePictureRef}
                  onClick={handleShowProfilePictureModal}
                />
                <Modal>
                  <Modal.Open opens="picture">
                    <div className="bg-tertiary bg-tertiary-hover absolute bottom-3 right-3 cursor-pointer rounded-full p-2 text-xl">
                      <FaCamera />
                    </div>
                  </Modal.Open>
                  <Modal.Window name="picture" type="center">
                    <AddProfilePicture />
                  </Modal.Window>
                </Modal>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="whitespace-nowrap text-xl font-bold md:text-3xl">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-tertiary text-sm font-semibold">
                {profile.friends.length}{" "}
                {profile.friends.length === 1 ? "friend" : "friends"}
              </p>
            </div>
            {isProfileOwner && (
              <div className="ml-auto p-2">
                <button className="bg-tertiary text-secondary bg-tertiary-hover flex flex-row items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1 text-sm font-semibold md:px-3 md:py-1.5 md:text-base">
                  <FaPencilAlt />
                  <span>Edit Profile</span>
                </button>
              </div>
            )}
          </div>
          <div className="px-3 xl:mx-auto xl:w-4/6">
            <div className="separator flex flex-row gap-3 border-t pt-1">
              <div
                className={`flex justify-center border-b-4 ${
                  activePage === "home"
                    ? "border-blue-600 text-blue-600"
                    : "text-secondary border-transparent"
                }`}
              >
                <Link
                  to={`/profile/${profile.username}`}
                  className={`${
                    activePage === "home" ? "" : "bg-tertiary-hover"
                  } cursor-pointer rounded-md p-3 font-semibold`}
                >
                  Posts
                </Link>
              </div>
              <div
                className={`flex justify-center border-b-4 ${
                  activePage === "friends"
                    ? "border-blue-600 text-blue-600"
                    : "text-secondary border-transparent"
                }`}
              >
                <Link
                  to={`/profile/${profile.username}`}
                  className={`${
                    activePage === "friends" ? "" : "bg-tertiary-hover"
                  } cursor-pointer rounded-md p-3 font-semibold`}
                >
                  Friends
                </Link>
              </div>
              <div
                className={`flex justify-center border-b-4 ${
                  activePage === "photos"
                    ? "border-blue-600 text-blue-600"
                    : "text-secondary border-transparent"
                }`}
              >
                <Link
                  to={`/profile/${profile.username}/photos`}
                  className={`${
                    activePage === "photos" ? "" : "bg-tertiary-hover"
                  } cursor-pointer rounded-md p-3 font-semibold`}
                >
                  Photos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
