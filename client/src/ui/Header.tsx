import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa";
import {
  HiBuildingStorefront,
  HiHome,
  HiMiniUserGroup,
  HiOutlineBuildingStorefront,
  HiOutlineHome,
  HiOutlineTv,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiTv,
  HiUsers,
} from "react-icons/hi2";
import { RiNotification2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import HeaderLink from "./HeaderLink";
import HeaderSearch from "./HeaderSearch";
import HeaderSearchInput from "./HeaderSearchInput";
import LogoIcon from "./LogoIcon";

function Header() {
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const { user } = useSelector((state: RootState) => ({
    ...state,
  }));

  // const pictures = useSelector((state) => state.user.picture);

  return (
    <header className="fixed left-0 top-0 grid h-[55px] w-full grid-cols-3 px-3 py-1 shadow-md">
      <div className="flex flex-row items-center gap-5">
        <Link to="/">
          <LogoIcon />
        </Link>
        {showSearchPanel ? (
          <HeaderSearch setShowSearchPanel={setShowSearchPanel} />
        ) : (
          <HeaderSearchInput onClick={() => setShowSearchPanel(true)} />
        )}
      </div>
      <div className="grid grid-cols-5 items-center justify-between gap-2">
        <HeaderLink to="/">
          <HiOutlineHome />
          <HiHome className="text-blue-800" />
        </HeaderLink>
        <HeaderLink to="/">
          <HiOutlineUsers />
          <HiUsers className="text-blue-800" />
        </HeaderLink>
        <HeaderLink to="/">
          <HiOutlineTv />
          <HiTv className="text-blue-800" />
        </HeaderLink>
        <HeaderLink to="/">
          <HiOutlineBuildingStorefront />
          <HiBuildingStorefront className="text-blue-800" />
        </HeaderLink>
        <HeaderLink to="/">
          <HiOutlineUserGroup />
          <HiMiniUserGroup className="text-blue-800" />
        </HeaderLink>
      </div>
      <div className="flex flex-row items-center justify-end gap-2">
        <HeaderLink to="" right={true}>
          <CgMenuGridO />
        </HeaderLink>
        <HeaderLink to="/" right={true}>
          <FaFacebookMessenger />
        </HeaderLink>
        <HeaderLink to="/" right={true}>
          <RiNotification2Fill />
          <div className="absolute -right-1 -top-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red-600 text-center text-sm text-white">
            1
          </div>
        </HeaderLink>
        <Link to="/profile" className="transition-all hover:opacity-80">
          <img
            src={user?.picture}
            alt="Profile image"
            className="h-[40px] rounded-full"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
