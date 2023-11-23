import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { stories } from "../../../data/stories";
import { getUser } from "../user/userSlice";
import HomeStory from "./HomeStory";

function HomeMain() {
  const user = useSelector(getUser);
  return (
    <div className="text-secondary flex h-screen flex-row justify-center gap-2 overflow-x-hidden px-4 lg:px-2">
      <div className="bg-primary scale-image relative flex h-[225px] w-[150px] min-w-[150px] cursor-pointer flex-col gap-2 overflow-hidden rounded-xl shadow-md">
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
  );
}

export default HomeMain;
