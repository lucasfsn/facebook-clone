import { FaArrowLeft } from "react-icons/fa";
import { IoMdHelpCircle, IoMdMail } from "react-icons/io";
import { MdError } from "react-icons/md";

interface Props {
  handleGoBack: () => void;
}

function UserModalHelp({ handleGoBack }: Props) {
  return (
    <div className="bg-primary icon-text absolute right-[10px] top-[50px] z-50 flex max-h-[90vh] w-[300px] flex-col gap-3 rounded-lg p-3 shadow-md">
      <div className="flex items-center gap-2 p-2">
        <div
          className="icon-bg-hover cursor-pointer rounded-full p-2 text-xl"
          onClick={handleGoBack}
        >
          <FaArrowLeft />
        </div>
        <p className="text-2xl font-bold">Help & support</p>
      </div>
      <div className="flex flex-col">
        <div className="icon-bg-hover flex cursor-pointer items-center gap-2 rounded-lg p-2 text-base">
          <div className="icon-bg rounded-full p-2 text-xl">
            <IoMdHelpCircle />
          </div>
          <span>Help Center</span>
        </div>
        <div className="icon-bg-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base">
          <div className="icon-bg rounded-full p-2 text-xl">
            <IoMdMail />
          </div>
          <span>Support Inbox</span>
        </div>
        <div className="icon-bg-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base">
          <div className="icon-bg rounded-full p-2 text-xl">
            <MdError />
          </div>
          <span>Report a problem</span>
        </div>
      </div>
    </div>
  );
}

export default UserModalHelp;
