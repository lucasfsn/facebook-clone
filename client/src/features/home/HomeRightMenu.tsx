import { FaPenToSquare } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { HiMagnifyingGlass } from "react-icons/hi2";

function HomeRightMenu() {
  return (
    <div className="icon-text flex flex-col justify-between px-2">
      <div className="flex w-[200px] flex-col justify-center">
        <div className="flex flex-col border-b border-neutral-500 pb-2">
          <div className="flex flex-row justify-between">
            <span className="ml-2 font-semibold">Contacts</span>
            <div className="icon-bg-hover flex h-[35px] w-[35px] min-w-[35px] cursor-pointer items-center justify-center rounded-full">
              <HiMagnifyingGlass />
            </div>
          </div>
          <div className="icon-bg-hover flex cursor-pointer rounded-lg p-2">
            Alex
          </div>
        </div>
        <div className="flex flex-col gap-2 py-2">
          <span className="ml-2 font-semibold">Group conversations</span>
          <div className="icon-bg-hover flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2">
            <div className="icon-bg flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full text-xl">
              <FiPlus />
            </div>
            <span className="text-base">Create new group</span>
          </div>
        </div>
      </div>
      <div className="icon-bg icon-bg-hover icon-text flex h-[45px] w-[45px] min-w-[45px] cursor-pointer items-center justify-center self-end rounded-full text-xl shadow-lg">
        <FaPenToSquare />
      </div>
    </div>
  );
}

export default HomeRightMenu;
