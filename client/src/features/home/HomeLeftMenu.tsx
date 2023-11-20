import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { home } from "../../../data/home";
import { SHOW_LIMIT } from "../../utils/constants";
import { getUser } from "../user/userSlice";
import HomeLeftItem from "./HomeLeftItem";

function HomeLeftMenu() {
  const [showCount, setShowCount] = useState(SHOW_LIMIT);
  const [showText, setShowText] = useState("See more");
  const user = useSelector(getUser);

  function handleShow() {
    setShowCount((show) =>
      show === SHOW_LIMIT ? home.length - 1 : SHOW_LIMIT,
    );
    setShowText((show) => (show === "See more" ? "See less" : "See more"));
  }

  return (
    <div className="icon-text hidden h-fit max-h-[calc(100dvh_-90px)] overflow-y-scroll border-b border-neutral-500 pb-2 lg:block">
      <Link
        to="/profile"
        className="icon-bg-hover flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2"
      >
        <img
          src={user?.picture}
          alt="Profile picture"
          className="relative flex h-[35px] w-[35px] min-w-[35px] rounded-full"
        />
        <span className="text-base">
          {user?.firstName} {user?.lastName}
        </span>
      </Link>
      {home.slice(0, showCount).map((item) => (
        <HomeLeftItem key={item.name} item={item} />
      ))}
      <div
        className="icon-bg-hover flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2"
        onClick={handleShow}
      >
        <div className="icon-bg flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full text-2xl">
          {showText === "See more" ? (
            <MdKeyboardArrowDown />
          ) : (
            <MdKeyboardArrowUp />
          )}
        </div>
        <span className="text-base">{showText}</span>
      </div>
    </div>
  );
}

export default HomeLeftMenu;
