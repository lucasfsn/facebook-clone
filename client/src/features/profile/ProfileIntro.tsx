import { useState } from "react";
import { BiSolidBusSchool } from "react-icons/bi";
import { FaCity, FaGlobeEurope } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { HiHeart, HiHome } from "react-icons/hi2";
import { IoSchool } from "react-icons/io5";
import { useSelector } from "react-redux";
import Modal from "../../ui/Modal";
import { getUserId } from "../user/userSlice";
import EditDetails from "./EditDetails";
import { Details, getProfileDetails } from "./profileSlice";
import { useDetails } from "./useDetails";

interface ProfileIntroProps {
  isProfileOwner: boolean;
}

function ProfileIntro({ isProfileOwner }: ProfileIntroProps) {
  const profileDetails = useSelector(getProfileDetails);
  const userId = useSelector(getUserId);

  const [details, setDetails] = useState<Details>(profileDetails);
  const [showBio, setShowBio] = useState<boolean>(false);
  const [showEditDetails, setShowEditDetails] = useState<boolean>(true);

  const { updateDetails } = useDetails();

  async function handleSave() {
    if (!userId) return;

    const updatedDetails = Object.entries(details).reduce(
      (acc, [key, value]) => {
        if (value !== profileDetails[key as keyof Details]) {
          acc.push(key);
        }
        return acc;
      },
      [] as string[],
    ) as (keyof Details)[];

    await updateDetails(updatedDetails, details, userId);
  }

  function handleCloseEditDetails() {
    setShowEditDetails(false);
    setDetails(profileDetails);
  }

  return (
    <div className="bg-primary flex flex-col gap-3 rounded-md px-4 py-2">
      <p className="text-xl font-bold">Intro</p>
      <div className="text-secondary flex flex-col gap-2.5">
        {showBio && isProfileOwner && (
          <div className="flex flex-col">
            <textarea
              value={details.bio}
              placeholder="Describe who you are"
              onChange={(e) => setDetails({ ...details, bio: e.target.value })}
              className="bg-tertiary resize-none rounded-md p-1.5 text-center focus:outline-none focus:ring-2 focus:ring-blue-800"
              maxLength={101}
            />
            <span className="text-tertiary self-end text-sm">
              {101 - (details.bio?.length ?? 0)} characters remaining
            </span>
            <div className="flex justify-between pt-1">
              <div className="text-secondary flex items-center gap-2">
                <FaGlobeEurope className="text-xl" />
                <span>Public</span>
              </div>
              <div className="flex gap-1">
                <button
                  className="bg-tertiary bg-tertiary-hover rounded-md px-2.5 py-1.5 font-semibold"
                  onClick={() => {
                    setDetails({ ...details, bio: profileDetails.bio });
                    setShowBio(false);
                  }}
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
        )}
        {!showBio && <p className="text-center">{profileDetails.bio}</p>}
        {!showBio && isProfileOwner && (
          <button
            className="bg-tertiary bg-tertiary-hover w-full rounded-md p-1.5"
            onClick={() => setShowBio(true)}
          >
            {details.bio ? "Edit bio" : "Add bio"}
          </button>
        )}
        {profileDetails.currentCity && (
          <div className="flex flex-row items-center gap-2.5">
            <FaCity className="text-tertiary md:text-2xl" />
            <span>Lives in {profileDetails.currentCity}</span>
          </div>
        )}
        {profileDetails.hometown && (
          <div className="flex flex-row items-center gap-2.5">
            <HiHome className="text-tertiary md:text-2xl" />
            <span>From {profileDetails.hometown}</span>
          </div>
        )}
        {profileDetails.highschool && (
          <div className="flex flex-row items-center gap-2.5">
            <BiSolidBusSchool className="text-tertiary md:text-2xl" />
            <span>Studied at {profileDetails.highschool}</span>
          </div>
        )}
        {profileDetails.college && (
          <div className="flex flex-row items-center gap-2.5">
            <IoSchool className="text-tertiary md:text-2xl" />
            <span>Studied at {profileDetails.college}</span>
          </div>
        )}
        {profileDetails.relationship && (
          <div className="flex flex-row items-center gap-2.5">
            <HiHeart className="text-tertiary md:text-2xl" />
            <span>{profileDetails.relationship}</span>
          </div>
        )}
        {profileDetails.workplace && (
          <div className="flex flex-row items-center gap-2.5">
            <GiTakeMyMoney className="text-tertiary md:text-2xl" />
            <span>Works at {profileDetails.workplace}</span>
          </div>
        )}
        {isProfileOwner && (
          <Modal>
            <Modal.Open opens="details">
              <button
                className="bg-tertiary bg-tertiary-hover w-full rounded-md p-1.5"
                onClick={() => setShowEditDetails(true)}
              >
                Edit details
              </button>
            </Modal.Open>
            {showEditDetails && (
              <Modal.Window name="details" type="center">
                <EditDetails
                  details={details}
                  setDetails={setDetails}
                  handleSave={handleSave}
                  close={handleCloseEditDetails}
                />
              </Modal.Window>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ProfileIntro;
