import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaGlobeEurope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Details, getProfileDetails } from "./profileSlice";

interface EditDetailsLabel {
  detail: keyof Details;
  title?: string;
  details: Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
  children: string;
}

function EditDetailsLabel({
  detail,
  title,
  details,
  setDetails,
  children,
}: EditDetailsLabel) {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const profileDetails = useSelector(getProfileDetails);

  const isAdded =
    isSaved || details[detail] ? children.replace("Add", "Edit") : children;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold">{title}</p>
      <div
        className="flex w-fit cursor-pointer items-center gap-2"
        onClick={() => setShowEdit((show) => !show)}
      >
        <CiCirclePlus className="text-3xl text-blue-300" />
        <span className="text-blue-600 hover:underline">{isAdded}</span>
      </div>
      {showEdit ? (
        <>
          <textarea
            value={details[detail]}
            onChange={(e) =>
              setDetails({ ...details, [detail]: e.target.value })
            }
            placeholder={children}
            className="bg-tertiary resize-none rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          <div className="flex justify-between pt-1">
            <div className="text-secondary flex items-center gap-2">
              <FaGlobeEurope className="text-xl" />
              <span>Public</span>
            </div>
            <div className="flex gap-1">
              <button
                className="bg-tertiary bg-tertiary-hover rounded-md px-2.5 py-1.5 font-semibold"
                onClick={() => {
                  setShowEdit(false);
                  setDetails({
                    ...details,
                    [detail]: profileDetails[detail],
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-blue-500 px-2.5 py-1.5 font-semibold text-white hover:bg-blue-400"
                onClick={() => {
                  setShowEdit(false);
                  setIsSaved(true);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>{details[detail]}</p>
      )}
    </div>
  );
}

export default EditDetailsLabel;
