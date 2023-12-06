import { RefObject } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { IoIosImages } from "react-icons/io";
import { useOutsideClick } from "../../hooks/useOutsideClick";

interface AddCoverModalProps {
  button: RefObject<HTMLButtonElement>;
  close: () => void;
}

function AddCoverModal({ button, close }: AddCoverModalProps) {
  const { ref } = useOutsideClick(close, true, button);

  return (
    <div
      className="bg-primary text-secondary absolute right-4 flex w-[300px] flex-col rounded-lg p-2"
      ref={ref}
    >
      <div className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1">
        <IoIosImages />
        <span>Choose cover photo</span>
      </div>
      <div className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1">
        <HiOutlineUpload />
        <span>Upload photo</span>
      </div>
    </div>
  );
}

export default AddCoverModal;
