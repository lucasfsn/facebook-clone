import { useState } from "react";
import { BsFillPersonXFill, BsPersonCheckFill } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Spinner from "../../ui/Spinner";
import { getUserId } from "../user/userSlice";
import { getLoading, getUserProfile } from "./profileSlice";
import { useFriend } from "./useFriend";

function FriendStatus() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const profile = useSelector(getUserProfile);
  const isLoading = useSelector(getLoading);
  const userId = useSelector(getUserId);
  const {
    addFriend,
    cancelFriendRequest,
    removeFriend,
    denyFriendRequest,
    acceptFriendRequest,
  } = useFriend();

  const { ref } = useOutsideClick(() => setShowMenu(false));

  if (isLoading || !userId) return <Spinner />;

  const status = {
    friends: profile.friends.includes(userId),
    sender:
      profile.sentFriendRequests.includes(userId) && profile._id !== userId,
    receiver: profile.friendRequests.includes(userId) && profile._id !== userId,
  };

  let buttonContent: JSX.Element;
  if (status.friends) {
    buttonContent = (
      <>
        <BsPersonCheckFill className="text-xl" />
        <span>Friends</span>
      </>
    );
  } else if (status.receiver) {
    buttonContent = (
      <>
        <BsFillPersonXFill className="text-xl" />
        <span>Cancel request</span>
      </>
    );
  } else if (status.sender) {
    buttonContent = (
      <>
        <BsPersonCheckFill className="text-xl" />
        <span>Respond</span>
      </>
    );
  } else {
    buttonContent = (
      <>
        <IoPersonAdd className="text-xl" />
        <span>Add friend</span>
      </>
    );
  }

  async function handleClick() {
    setShowMenu((show) => !show);

    if (status.friends || status.sender || !userId) return;

    if (!status.friends && !status.receiver && !status.sender) {
      await addFriend(userId, profile._id);
    } else if (!status.friends && status.receiver && !status.sender) {
      await cancelFriendRequest(userId, profile._id);
    }
  }

  return (
    <div
      ref={ref}
      className={`text-secondary relative flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1 text-sm font-semibold md:px-3 md:py-1.5 md:text-base ${
        status.friends
          ? "bg-tertiary bg-tertiar-hover"
          : "bg-blue-600 hover:bg-blue-500"
      }`}
      onClick={handleClick}
    >
      {buttonContent}
      {status.sender && showMenu && (
        <div
          className="bg-primary absolute right-0 top-full flex w-[250px] flex-col rounded-md p-1.5 text-start shadow-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-tertiary-hover rounded-md p-1.5"
            onClick={async () => {
              await acceptFriendRequest(userId, profile._id);
            }}
          >
            Confirm
          </div>
          <div
            className="bg-tertiary-hover rounded-md p-1.5"
            onClick={async () => {
              await denyFriendRequest(userId, profile._id);
            }}
          >
            Remove request
          </div>
        </div>
      )}
      {status.friends && showMenu && (
        <div
          className="bg-primary absolute right-0 top-full flex w-[250px] flex-col rounded-md p-1.5 text-start shadow-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-tertiary-hover flex items-center gap-2 rounded-md p-1.5"
            onClick={async () => {
              await removeFriend(userId, profile._id);
            }}
          >
            <BsFillPersonXFill className="text-xl" />
            <span>Unfriend</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default FriendStatus;
