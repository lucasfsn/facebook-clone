import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { stories } from "../../../data/stories";
import { getUser } from "../user/userSlice";
import HomeStory from "./HomeStory";

function HomeMain() {
  const user = useSelector(getUser);
  return (
    <div className="text-secondary flex h-screen flex-row justify-center gap-2 px-4 lg:px-2">
      <div className="bg-primary scale-image flex h-[225px] w-[150px] cursor-pointer flex-col gap-5 overflow-scroll rounded-xl pb-2.5 shadow-md transition-all hover:brightness-90">
        <img
          src={user?.picture}
          alt="Story"
          className="h-5/6 rounded-t-xl object-cover"
        />
        <div className="relative flex flex-col items-center">
          <div className="border-primary absolute -top-[40px] rounded-full border-4 bg-blue-500 p-1 text-white">
            <FiPlus className="text-2xl" />
          </div>
          <div>Create story</div>
        </div>
      </div>
      {stories.map((story) => (
        <HomeStory story={story} />
      ))}
    </div>
  );
}

export default HomeMain;
