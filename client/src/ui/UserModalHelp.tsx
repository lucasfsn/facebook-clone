import { FaArrowLeft } from "react-icons/fa";
import { IoMdHelpCircle, IoMdMail } from "react-icons/io";
import { MdError } from "react-icons/md";

interface UserModalHelpProps {
  handleGoBack: () => void;
}

function UserModalHelp({ handleGoBack }: UserModalHelpProps) {
  return (
    <div className="bg-primary text-secondary absolute right-[10px] top-[50px] z-50 flex max-h-[90vh] w-[300px] flex-col gap-3 rounded-lg p-3 shadow-md">
      <div className="flex items-center gap-2 p-2">
        <div
          className="bg-tertiary-hover cursor-pointer rounded-full p-2 text-xl"
          onClick={handleGoBack}
        >
          <FaArrowLeft />
        </div>
        <p className="text-2xl font-bold">Help & support</p>
      </div>
      <div className="flex flex-col">
        <div className="bg-tertiary-hover flex cursor-pointer items-center gap-2 rounded-lg p-2 text-base">
          <div className="bg-tertiary rounded-full p-2 text-xl">
            <IoMdHelpCircle />
          </div>
          <span>Help Center</span>
        </div>
        <div className="bg-tertiary-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base">
          <div className="bg-tertiary rounded-full p-2 text-xl">
            <IoMdMail />
          </div>
          <span>Support Inbox</span>
        </div>
        <div className="bg-tertiary-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base">
          <div className="bg-tertiary rounded-full p-2 text-xl">
            <MdError />
          </div>
          <span>Report a problem</span>
        </div>
      </div>
    </div>
  );
}

export default UserModalHelp;
