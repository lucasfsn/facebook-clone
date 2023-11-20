import { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";
import { IoMdHelpCircle, IoMdMoon, IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { MdFeedback } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogout } from "../features/user/useLogout";
import { getUser } from "../features/user/userSlice";
import UserModalAccessibility from "./UserModalAccessibility";
import UserModalHelp from "./UserModalHelp";
import UserModalSettings from "./UserModalSettings";

function UserModal() {
  const { logoutUser } = useLogout();
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  const user = useSelector(getUser);

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
    <div className="bg-primary absolute right-[10px] top-[50px] z-50 flex max-h-[90vh] w-[300px] flex-col gap-3 rounded-lg p-3 shadow-md">
      <div className="bg-tertiary rounded-lg p-1 shadow-3xl">
        <Link
          to="/profile"
          className="bg-tertiary-hover bg-tertiary flex cursor-pointer items-center gap-2 rounded-lg p-2.5"
        >
          <img
            src={user?.picture}
            alt="Profile picture"
            className="w-[40px] rounded-full"
          />
          <span className="text-secondary text-lg font-semibold">
            {user?.firstName} {user?.lastName}
          </span>
        </Link>
      </div>
      <div className="flex flex-col">
        <div
          className="bg-tertiary-hover flex cursor-pointer items-center justify-between rounded-lg p-2 text-base"
          onClick={() => setShowSettings(true)}
        >
          <div className="flex items-center gap-2">
            <div className="bg-tertiary text-secondary rounded-full p-2 text-xl">
              <IoMdSettings />
            </div>
            <span className="text-secondary">Settings & privacy</span>
          </div>
          <HiChevronRight className="text-secondary text-2xl" />
        </div>
        <div
          className="bg-tertiary-hover flex cursor-pointer items-center justify-between rounded-lg p-2 text-base"
          onClick={() => setShowHelp(true)}
        >
          <div className="flex items-center gap-2">
            <div className="bg-tertiary text-secondary rounded-full p-2 text-xl">
              <IoMdHelpCircle />
            </div>
            <span className="text-secondary">Help & support</span>
          </div>
          <HiChevronRight className="text-secondary text-2xl" />
        </div>
        <div
          className="bg-tertiary-hover flex cursor-pointer items-center justify-between rounded-lg p-2 text-base"
          onClick={() => setShowAccessibility(true)}
        >
          <div className="flex items-center gap-2">
            <div className="bg-tertiary text-secondary rounded-full p-2 text-xl">
              <IoMdMoon />
            </div>
            <span className="text-secondary">Display & accessibility</span>
          </div>
          <HiChevronRight className="text-secondary text-2xl" />
        </div>
        <div className="bg-tertiary-hover flex cursor-pointer items-center gap-2 rounded-lg p-2 text-base">
          <div className="bg-tertiary text-secondary rounded-full p-2 text-xl">
            <MdFeedback />
          </div>
          <span className="text-secondary">Give feedback</span>
        </div>
        <div
          className="bg-tertiary-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base"
          onClick={logoutUser}
        >
          <div className="bg-tertiary text-secondary rounded-full p-2 text-xl">
            <IoLogOut />
          </div>
          <span className="text-secondary">Log Out</span>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
