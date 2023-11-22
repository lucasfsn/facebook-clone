import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { home } from "../../../data/home";
import { SHOW_LIMIT } from "../../utils/constants";
import { getUser } from "../user/userSlice";
import HomeMenuItem from "./HomeMenuItem";

function HomeMenu() {
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
    <div className="text-secondary separator fixed hidden h-fit max-h-[calc(100dvh_-90px)] w-[275px] overflow-y-scroll border-b pb-2 lg:block">
      <Link
        to="/profile"
        className="bg-tertiary-hover flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2"
      >
        <img
          src={user?.picture}
          alt="Profile picture"
          className="relative flex h-[30px] w-[30px] min-w-[30px] rounded-full"
        />
        <span className="text-base">
          {user?.firstName} {user?.lastName}
        </span>
      </Link>
      {home.slice(0, showCount).map((item) => (
        <HomeMenuItem key={item.name} item={item} />
      ))}
      <div
        className="bg-tertiary-hover flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2"
        onClick={handleShow}
      >
        <div className="bg-tertiary flex h-[30px] w-[30px] min-w-[30px] items-center justify-center rounded-full text-2xl">
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

export default HomeMenu;
