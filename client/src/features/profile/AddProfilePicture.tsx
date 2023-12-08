import { BsPlus } from "react-icons/bs";

function AddProfilePicture() {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="separator border-b pb-4 text-xl font-bold">
        Choose profile picture
      </div>
      <div className="w-full">
        <button className="flex w-full flex-row items-center justify-center bg-blue-300">
          <BsPlus />
          <span>Upload photo</span>
        </button>
      </div>
    </div>
  );
}

export default AddProfilePicture;
