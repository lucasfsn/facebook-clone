import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
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
    <div className="hidden h-fit max-h-[calc(100dvh_-90px)] overflow-y-scroll border-b border-gray-300 pb-2 lg:block">
      <Link
        to="/profile"
        className="flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2 hover:bg-gray-200"
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
        className="flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2 hover:bg-gray-200"
        onClick={handleShow}
      >
        <div className="flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full bg-gray-300 text-2xl">
          <MdKeyboardArrowDown />
        </div>
        <span className="text-base">{showText}</span>
      </div>
    </div>
  );
}

export default HomeLeftMenu;
