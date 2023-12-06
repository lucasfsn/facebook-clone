import { FaPenToSquare } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { HiMagnifyingGlass } from "react-icons/hi2";

function HomeContacts() {
  return (
    <div className="text-secondary sticky top-[55px] hidden max-h-[calc(100dvh_-90px)] min-w-[275px] flex-col pr-3 pt-3 md:block">
      <div className="flex flex-col justify-center">
        <div className="separator flex flex-col border-b pb-2">
          <div className="flex flex-row justify-between">
            <span className="ml-2 font-semibold">Contacts</span>
            <div className="bg-tertiary-hover flex h-[35px] w-[35px] min-w-[35px] cursor-pointer items-center justify-center rounded-full">
              <HiMagnifyingGlass />
            </div>
          </div>
          <div className="bg-tertiary-hover flex cursor-pointer rounded-lg p-2">
            Alex
          </div>
        </div>
        <div className="flex flex-col gap-2 py-2">
          <span className="ml-2 font-semibold">Group conversations</span>
          <div className="bg-tertiary-hover flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2">
            <div className="bg-tertiary flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full text-xl">
              <FiPlus />
            </div>
            <span className="text-base">Create new group</span>
          </div>
        </div>
      </div>
      <div className="bg-tertiary bg-tertiary-hover text-secondary fixed bottom-5 right-5 flex h-[45px] w-[45px] min-w-[45px] cursor-pointer items-center justify-center self-end rounded-full text-xl shadow-lg">
        <FaPenToSquare />
      </div>
    </div>
  );
}

export default HomeContacts;
