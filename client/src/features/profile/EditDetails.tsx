import EditDetailsLabel from "./EditDetailsLabel";
import { Details } from "./profileSlice";

interface EditDetailsProps {
  details: Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
  handleSave: () => Promise<void>;
  close: () => void;
}

function EditDetails({
  details,
  setDetails,
  handleSave,
  close,
}: EditDetailsProps) {
  return (
    <div className="bg-primary text-secondary flex flex-col rounded-md py-4">
      <div className="separator border-b pb-4 text-center text-xl font-bold">
        Edit details
      </div>
      <div className="flex max-h-[400px] flex-col gap-4 overflow-y-scroll px-4 py-4">
        <div>
          <p className="font-semibold">Customize your intro</p>
          <p className="text-tertiary">Details you select will be public.</p>
        </div>
        <EditDetailsLabel
          detail="workplace"
          title="Work"
          details={details}
          setDetails={setDetails}
        >
          Add a workplace
        </EditDetailsLabel>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Education</p>
          <EditDetailsLabel
            detail="highschool"
            details={details}
            setDetails={setDetails}
          >
            Add high school
          </EditDetailsLabel>
          <EditDetailsLabel
            detail="college"
            details={details}
            setDetails={setDetails}
          >
            Add college
          </EditDetailsLabel>
        </div>
        <EditDetailsLabel
          detail="currentCity"
          title="Current city"
          details={details}
          setDetails={setDetails}
        >
          Add current city
        </EditDetailsLabel>
        <EditDetailsLabel
          detail="hometown"
          title="Hometown"
          details={details}
          setDetails={setDetails}
        >
          Add a hometown
        </EditDetailsLabel>
        <EditDetailsLabel
          detail="relationship"
          title="Relationship"
          details={details}
          setDetails={setDetails}
        >
          Add a relationship status
        </EditDetailsLabel>
      </div>
      <div className="separator flex items-center justify-between border-t px-4 pt-4">
        <div className="font-semibold text-blue-300">
          Update Your Information
        </div>
        <div className="flex gap-2">
          <button
            className="bg-tertiary bg-tertiary-hover rounded-md px-2.5 py-1.5 font-semibold"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-blue-500 px-2.5 py-1.5 font-semibold text-white hover:bg-blue-400"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDetails;
