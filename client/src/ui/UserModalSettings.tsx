import { FaArrowLeft } from "react-icons/fa";
import { GiDialPadlock, GiPadlock } from "react-icons/gi";
import { HiChevronRight } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import { MdLanguage } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

interface UserModalSettingsProps {
  handleGoBack: () => void;
}

function UserModalSettings({ handleGoBack }: UserModalSettingsProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-primary absolute right-[10px] top-[50px] z-50 flex max-h-[90vh] w-[300px] flex-col gap-3 rounded-lg p-3 shadow-md">
      <div className="flex items-center gap-2 p-2">
        <div
          className="bg-tertiary-hover text-secondary cursor-pointer rounded-full p-2 text-xl"
          onClick={handleGoBack}
        >
          <FaArrowLeft />
        </div>
        <p className="text-secondary text-2xl font-bold">Settings & privacy</p>
      </div>
      <div className="flex flex-col">
        <div
          className="bg-tertiary-hover flex cursor-pointer items-center gap-2 rounded-lg p-2 text-base"
          onClick={() => navigate("/settings")}
        >
          <div className="text-secondary bg-tertiary rounded-full p-2 text-xl">
            <IoMdSettings />
          </div>
          <span className="text-secondary">Settings</span>
        </div>
        <div className="bg-tertiary-hover flex cursor-pointer items-center justify-between rounded-lg p-2 text-base">
          <div className="flex items-center gap-2">
            <div className="text-secondary bg-tertiary rounded-full p-2 text-xl">
              <MdLanguage />
            </div>
            <span className="text-secondary">Language</span>
          </div>
          <HiChevronRight className="text-secondary text-2xl" />
        </div>
        <div className="bg-tertiary-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base">
          <div className="bg-tertiary text-secondary rounded-full p-2 text-xl">
            <GiDialPadlock />
          </div>
          <span className="text-secondary">Privacy Checkup</span>
        </div>
        <div className="bg-tertiary-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base">
          <div className="text-secondary bg-tertiary rounded-full p-2 text-xl">
            <GiPadlock />
          </div>
          <span className="text-secondary">Privacy Center</span>
        </div>
        <div className="bg-tertiary-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base">
          <div className="bg-tertiary text-secondary rounded-full p-2 text-xl">
            <RxActivityLog />
          </div>
          <span className="text-secondary">Activity log</span>
        </div>
        <div className="bg-tertiary-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base">
          <div className="text-secondary bg-tertiary rounded-full p-2 text-xl">
            <LuSettings2 />
          </div>
          <span className="text-secondary">Feed</span>
        </div>
      </div>
    </div>
  );
}

export default UserModalSettings;
