import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa";
import {
  HiBuildingStorefront,
  HiOutlineBuildingStorefront,
  HiOutlineTv,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiTv,
  HiUserGroup,
  HiUsers,
} from "react-icons/hi2";
import { RiHome5Fill, RiHome5Line, RiNotification2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../store";
import HeaderLink from "./HeaderLink";
import HeaderSearchInput from "./HeaderSearchInput";
import HeaderSearch from "./HeaderSearchModal";
import Logo from "./Logo";
import MenuModal from "./MenuModal";
import Modal from "./Modal";
import UserModal from "./UserModal";

function Header() {
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const user = useSelector((state: RootState) => state.user?.user);
  const location = useLocation();

  const currentPage =
    location.pathname === "/" ? "home" : location.pathname.split("/")[1];

  return (
    <header className="fixed left-0 top-0 grid h-[55px] w-full grid-cols-3 bg-white px-3 py-[4px] shadow-md">
      <div className="flex flex-row items-center gap-5">
        <Link to="/">
          <Logo style="icon" />
        </Link>
        {showSearchPanel ? (
          <HeaderSearch setShowSearchPanel={setShowSearchPanel} />
        ) : (
          <HeaderSearchInput
            placeholder="Search Facebook"
            onClick={() => setShowSearchPanel(true)}
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <HeaderLink to="/" active={currentPage === "home"} className="md:flex">
          {currentPage === "home" ? (
            <RiHome5Fill className="text-blue-600" />
          ) : (
            <RiHome5Line />
          )}
        </HeaderLink>
        <HeaderLink
          to="/friends"
          active={currentPage === "friends"}
          className="md:flex"
        >
          {currentPage === "friends" ? (
            <HiUsers className="text-blue-600" />
          ) : (
            <HiOutlineUsers />
          )}
        </HeaderLink>
        <HeaderLink
          to="/watch"
          active={currentPage === "watch"}
          className="md:flex"
        >
          {currentPage === "watch" ? (
            <HiTv className="text-blue-600" />
          ) : (
            <HiOutlineTv />
          )}
        </HeaderLink>
        <HeaderLink
          to="/marketplace"
          active={currentPage === "marketplace"}
          className="md:flex"
        >
          {currentPage === "marketplace" ? (
            <HiBuildingStorefront className="text-blue-600" />
          ) : (
            <HiOutlineBuildingStorefront />
          )}
        </HeaderLink>
        <HeaderLink
          to="/profile"
          active={currentPage === "profile"}
          className="lg:flex"
        >
          {currentPage === "profile" ? (
            <HiUserGroup className="text-blue-600" />
          ) : (
            <HiOutlineUserGroup />
          )}
        </HeaderLink>
      </div>
      <div className="flex flex-row items-center justify-end gap-2">
        <Modal>
          <Modal.Open opens="menu">
            <button className="relative flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-full bg-gray-200 text-2xl text-stone-600 hover:bg-gray-300 hover:text-stone-700 active:h-[39px] active:min-w-[39px]">
              <CgMenuGridO />
            </button>
          </Modal.Open>
          <Modal.Window name="menu" type="custom">
            <MenuModal />
          </Modal.Window>
          <button className="relative flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-full bg-gray-200 text-2xl text-stone-600 hover:bg-gray-300 hover:text-stone-700 active:h-[39px] active:min-w-[39px]">
            <FaFacebookMessenger />
          </button>
          <button className="relative flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-full bg-gray-200 text-2xl text-stone-600 hover:bg-gray-300 hover:text-stone-700 active:h-[39px] active:min-w-[39px]">
            <RiNotification2Fill />
            <div className="absolute -right-1 -top-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red-600 text-center text-sm text-white">
              1
            </div>
          </button>
          <Modal.Open opens="profile">
            <img
              src={user?.picture}
              alt="Profile image"
              className="relative flex h-[40px] w-[40px] min-w-[40px] cursor-pointer rounded-full transition-all  hover:brightness-95 active:h-[39px] active:min-w-[39px]"
            />
          </Modal.Open>
          <Modal.Window name="profile" type="custom">
            <UserModal />
          </Modal.Window>
        </Modal>
      </div>
    </header>
  );
}

export default Header;
