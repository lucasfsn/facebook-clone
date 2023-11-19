import { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";
import { IoMdHelpCircle, IoMdMoon, IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { MdFeedback } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogout } from "../features/user/useLogout";
import { RootState } from "../store";
import UserModalAccessibility from "./UserModalAccessibility";
import UserModalHelp from "./UserModalHelp";
import UserModalSettings from "./UserModalSettings";

function UserModal() {
  const { logoutUser } = useLogout();
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  const user = useSelector((state: RootState) => state.user?.user);

  if (showSettings)
    return <UserModalSettings handleGoBack={() => setShowSettings(false)} />;

  if (showHelp)
    return <UserModalHelp handleGoBack={() => setShowHelp(false)} />;

  if (showAccessibility)
    return (
      <UserModalAccessibility
        handleGoBack={() => setShowAccessibility(false)}
      />
    );

  return (
    <div className="absolute right-[10px] top-[50px] z-50 flex max-h-[90vh] w-[300px] flex-col gap-3 rounded-lg bg-white p-3 shadow-md">
      <div className="rounded-lg bg-white p-1 shadow-3xl">
        <Link
          to="/me"
          className="flex cursor-pointer items-center gap-2 rounded-lg p-2.5 hover:bg-gray-100"
        >
          <img
            src={user?.picture}
            alt="Profile picture"
            className="w-[40px] rounded-full"
          />
          <span className="text-lg font-semibold">
            {user?.firstName} {user?.lastName}
          </span>
        </Link>
      </div>
      <div className="flex flex-col">
        <div
          className="flex cursor-pointer items-center justify-between rounded-lg p-2 text-base hover:bg-gray-100"
          onClick={() => setShowSettings(true)}
        >
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gray-200 p-2 text-xl">
              <IoMdSettings />
            </div>
            <span>Settings & privacy</span>
          </div>
          <HiChevronRight className="text-2xl" />
        </div>
        <div
          className="flex cursor-pointer items-center justify-between rounded-lg p-2 text-base hover:bg-gray-100"
          onClick={() => setShowHelp(true)}
        >
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gray-200 p-2 text-xl">
              <IoMdHelpCircle />
            </div>
            <span>Help & support</span>
          </div>
          <HiChevronRight className="text-2xl" />
        </div>
        <div
          className="flex cursor-pointer items-center justify-between rounded-lg p-2 text-base hover:bg-gray-100"
          onClick={() => setShowAccessibility(true)}
        >
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gray-200 p-2 text-xl">
              <IoMdMoon />
            </div>
            <span>Display & accessibility</span>
          </div>
          <HiChevronRight className="text-2xl" />
        </div>
        <div className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-base hover:bg-gray-100">
          <div className="rounded-full bg-gray-200 p-2 text-xl">
            <MdFeedback />
          </div>
          <span>Give feedback</span>
        </div>
        <div
          className="flex cursor-pointer items-center gap-2 rounded-lg  p-2 text-base hover:bg-gray-100"
          onClick={logoutUser}
        >
          <div className="rounded-full bg-gray-200 p-2 text-xl">
            <IoLogOut />
          </div>
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
