import { FaArrowLeft } from "react-icons/fa";
import { GiDialPadlock, GiPadlock } from "react-icons/gi";
import { HiChevronRight } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import { MdLanguage } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";

interface Props {
  handleGoBack: () => void;
}

function UserModalSettings({ handleGoBack }: Props) {
  return (
    <div className="absolute right-[10px] top-[50px] z-50 flex max-h-[90vh] w-[300px] flex-col gap-3 rounded-lg bg-white p-3 shadow-md">
      <div className="flex items-center gap-2 p-2">
        <div
          className="cursor-pointer rounded-full p-2 text-xl hover:bg-gray-100"
          onClick={handleGoBack}
        >
          <FaArrowLeft />
        </div>
        <p className="text-2xl font-bold">Settings & privacy</p>
      </div>
      <div className="flex flex-col">
        <div className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-base hover:bg-gray-100">
          <div className="rounded-full bg-gray-200 p-2 text-xl">
            <IoMdSettings />
          </div>
          <span>Settings</span>
        </div>
        <div className="flex cursor-pointer items-center justify-between rounded-lg p-2 text-base hover:bg-gray-100">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gray-200 p-2 text-xl">
              <MdLanguage />
            </div>
            <span>Language</span>
          </div>
          <HiChevronRight className="text-2xl" />
        </div>
        <div className="flex cursor-pointer items-center gap-2 rounded-lg  p-2 text-base hover:bg-gray-100">
          <div className="rounded-full bg-gray-200 p-2 text-xl">
            <GiDialPadlock />
          </div>
          <span>Privacy Checkup</span>
        </div>
        <div className="flex cursor-pointer items-center gap-2 rounded-lg  p-2 text-base hover:bg-gray-100">
          <div className="rounded-full bg-gray-200 p-2 text-xl">
            <GiPadlock />
          </div>
          <span>Privacy Center</span>
        </div>
        <div className="flex cursor-pointer items-center gap-2 rounded-lg  p-2 text-base hover:bg-gray-100">
          <div className="rounded-full bg-gray-200 p-2 text-xl">
            <RxActivityLog />
          </div>
          <span>Activity log</span>
        </div>
        <div className="flex cursor-pointer items-center gap-2 rounded-lg  p-2 text-base hover:bg-gray-100">
          <div className="rounded-full bg-gray-200 p-2 text-xl">
            <LuSettings2 />
          </div>
          <span>Feed</span>
        </div>
      </div>
    </div>
  );
}

export default UserModalSettings;
