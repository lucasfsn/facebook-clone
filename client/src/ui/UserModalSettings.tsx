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
    <div className="bg-primary absolute right-[10px] top-[50px] z-50 flex max-h-[90vh] w-[300px] flex-col gap-3 rounded-lg p-3 shadow-md">
      <div className="flex items-center gap-2 p-2">
        <div
          className="icon-bg-hover icon-text cursor-pointer rounded-full p-2 text-xl"
          onClick={handleGoBack}
        >
          <FaArrowLeft />
        </div>
        <p className="icon-text text-2xl font-bold">Settings & privacy</p>
      </div>
      <div className="flex flex-col">
        <div className="icon-bg-hover flex cursor-pointer items-center gap-2 rounded-lg p-2 text-base">
          <div className="icon-text icon-bg rounded-full p-2 text-xl">
            <IoMdSettings />
          </div>
          <span className="icon-text">Settings</span>
        </div>
        <div className="icon-bg-hover flex cursor-pointer items-center justify-between rounded-lg p-2 text-base">
          <div className="flex items-center gap-2">
            <div className="icon-text icon-bg rounded-full p-2 text-xl">
              <MdLanguage />
            </div>
            <span className="icon-text">Language</span>
          </div>
          <HiChevronRight className="icon-text text-2xl" />
        </div>
        <div className="icon-bg-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base">
          <div className="icon-bg icon-text rounded-full p-2 text-xl">
            <GiDialPadlock />
          </div>
          <span className="icon-text">Privacy Checkup</span>
        </div>
        <div className="icon-bg-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base">
          <div className="icon-text icon-bg rounded-full p-2 text-xl">
            <GiPadlock />
          </div>
          <span className="icon-text">Privacy Center</span>
        </div>
        <div className="icon-bg-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base">
          <div className="icon-bg icon-text rounded-full p-2 text-xl">
            <RxActivityLog />
          </div>
          <span className="icon-text">Activity log</span>
        </div>
        <div className="icon-bg-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base">
          <div className="icon-text icon-bg rounded-full p-2 text-xl">
            <LuSettings2 />
          </div>
          <span className="icon-text">Feed</span>
        </div>
      </div>
    </div>
  );
}

export default UserModalSettings;
