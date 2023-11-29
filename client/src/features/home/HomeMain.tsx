import { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { stories } from "../../../data/stories";
import { getUser } from "../user/userSlice";
import AddPost from "./AddPost";
import HomeStory from "./HomeStory";

type Direction = "left" | "right";

function HomeMain() {
  const user = useSelector(getUser);

  const [position, setPosition] = useState(0);

  const storiesRef = useRef<HTMLDivElement>(null);

  function handleClick(direction: Direction) {
    const newPos = position + (direction === "left" ? -160 : 160);

    setPosition(newPos);

    if (storiesRef.current) {
      storiesRef.current.scrollTo({
        left: newPos,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="text-secondary relative flex h-screen w-[800px] flex-col gap-6 overflow-x-hidden">
      {position >= 160 && (
        <button
          onClick={() => handleClick("left")}
          className="bg-primary bg-tertiary-hover absolute left-3 top-[90px] z-10 flex h-[45px] w-[45px] items-center justify-center rounded-full shadow-md"
        >
          <IoIosArrowBack className="text-2xl" />
        </button>
      )}
      {position < (stories.length - 3) * 160 && (
        <button
          onClick={() => handleClick("right")}
          className="bg-primary bg-tertiary-hover absolute right-3 top-[90px] z-10 flex h-[45px] w-[45px] items-center justify-center rounded-full shadow-md"
        >
          <IoIosArrowForward className="text-2xl" />
        </button>
      )}
      <div
        ref={storiesRef}
        className="justify-left flex flex-row gap-[10px] overflow-x-hidden"
      >
        <div className="bg-primary scale-image flex h-[225px] w-[150px] min-w-[150px] cursor-pointer flex-col gap-2 overflow-hidden rounded-xl shadow-md">
          <div className="h-[75%] overflow-hidden">
            <img
              src={user?.picture}
              alt="Story"
              className="story h-full w-auto"
            />
          </div>
          <div className="relative flex justify-center">
            <div className="border-primary absolute -top-[27px] flex items-center justify-center rounded-full border-4 bg-blue-500 p-1 text-white">
              <FiPlus className="text-2xl" />
            </div>
            <div className="mt-2 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              Create story
            </div>
          </div>
        </div>
        {stories.map((story) => (
          <HomeStory key={story.profileName} story={story} />
        ))}
      </div>
      <AddPost />
    </div>
  );
}

export default HomeMain;
