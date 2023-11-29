import { IoHappyOutline, IoImages, IoVideocam } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getUser } from "../user/userSlice";

function AddPost() {
  const user = useSelector(getUser);
  return (
    <div className="bg-primary flex flex-col gap-2 rounded-lg p-4">
      <div className="separator flex flex-row gap-2 border-b pb-3">
        <img
          src={user?.picture}
          alt={user?.firstName}
          className="h-[40px] w-auto cursor-pointer rounded-full transition-all hover:brightness-95"
        />
        <button className="bg-tertiary bg-tertiary-hover w-full rounded-full px-3 text-left">
          What's on your mind, {user?.firstName}?
        </button>
      </div>
      <div className="flex flex-row justify-around gap-2">
        <div className="bg-tertiary-hover flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm md:text-base lg:px-8">
          <IoVideocam className="text-2xl text-red-500" />
          <span className="whitespace-nowrap font-semibold">Live video</span>
        </div>
        <div className="bg-tertiary-hover flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm md:text-base lg:px-8">
          <IoImages className="text-2xl text-green-500" />
          <span className="font-semibold">Photo/video</span>
        </div>
        <div className="bg-tertiary-hover flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm md:text-base lg:px-8">
          <IoHappyOutline className="text-2xl text-yellow-500" />
          <span className="font-semibold">Feeling/activity</span>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
