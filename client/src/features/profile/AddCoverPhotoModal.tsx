import { RefObject } from "react";
import { HiOutlineTrash, HiOutlineUpload } from "react-icons/hi";
import { IoIosImages } from "react-icons/io";
import { useSelector } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { getUserId } from "../user/userSlice";
import { useRemoveCover } from "./useRemoveCover";

interface AddCoverPhotoModalProps {
  button: RefObject<HTMLButtonElement>;
  close: () => void;
  uploadCoverRef: RefObject<HTMLInputElement>;
  showRemove: boolean;
}

function AddCoverPhotoModal({
  button,
  close,
  uploadCoverRef,
  showRemove,
}: AddCoverPhotoModalProps) {
  const { ref } = useOutsideClick(close, true, button);
  const userId = useSelector(getUserId);
  const { removeCover } = useRemoveCover();

  return (
    <div
      className="bg-primary text-secondary absolute right-4 z-10 flex w-[300px] flex-col rounded-lg p-2"
      ref={ref}
    >
      <div className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1">
        <IoIosImages />
        <span>Choose cover photo</span>
      </div>
      <div
        className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1"
        onClick={() => {
          uploadCoverRef.current?.click();
        }}
      >
        <HiOutlineUpload />
        <span>Upload photo</span>
      </div>
      {showRemove && (
        <div
          className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1"
          onClick={() => {
            if (userId) removeCover(userId);
          }}
        >
          <HiOutlineTrash />
          <span>Remove</span>
        </div>
      )}
    </div>
  );
}

export default AddCoverPhotoModal;
