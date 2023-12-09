import { useState } from "react";
import { BiSolidBusSchool } from "react-icons/bi";
import { FaCity, FaGlobeEurope } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { HiHeart, HiHome } from "react-icons/hi2";
import { IoSchool } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getUserId } from "../user/userSlice";
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

  const { updateDetails } = useDetails();

  async function handleSaveBio() {
    if (!userId) return;

    const updatedDetail = Object.entries(details).reduce(
      (acc, [key, value]) => {
        if (value !== profileDetails[key as keyof Details]) {
          acc.push(key);
        }
        return acc;
      },
      [] as string[],
    )[0] as keyof Details;

    await updateDetails(updatedDetail, details, userId);
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
                  onClick={() => setShowBio(false)}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-blue-600 px-2.5 py-1.5 font-semibold hover:bg-blue-500"
                  onClick={handleSaveBio}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {!showBio && <p className="text-center">{details.bio}</p>}
        {!showBio && isProfileOwner && (
          <button
            className="bg-tertiary bg-tertiary-hover w-full rounded-md p-1.5"
            onClick={() => setShowBio(true)}
          >
            {details.bio ? "Edit bio" : "Add bio"}
          </button>
        )}
        {details.currentCity && (
          <div className="flex flex-row items-center gap-2.5">
            <FaCity className="text-tertiary md:text-2xl" />
            <span>Lives in {details.currentCity}</span>
          </div>
        )}
        {details.hometown && (
          <div className="flex flex-row items-center gap-2.5">
            <HiHome className="text-tertiary md:text-2xl" />
            <span>From {details.hometown}</span>
          </div>
        )}
        {details.highschool && (
          <div className="flex flex-row items-center gap-2.5">
            <BiSolidBusSchool className="text-tertiary md:text-2xl" />
            <span>Studied at {details.highschool}</span>
          </div>
        )}
        {details.college && (
          <div className="flex flex-row items-center gap-2.5">
            <IoSchool className="text-tertiary md:text-2xl" />
            <span>Studied at {details.college}</span>
          </div>
        )}
        {details.relationship && (
          <div className="flex flex-row items-center gap-2.5">
            <HiHeart className="text-tertiary md:text-2xl" />
            <span>{details.relationship}</span>
          </div>
        )}
        {details.workplace && (
          <div className="flex flex-row items-center gap-2.5">
            <GiTakeMyMoney className="text-tertiary md:text-2xl" />
            <span>Works at {details.workplace}</span>
          </div>
        )}
        {isProfileOwner && (
          <button className="bg-tertiary bg-tertiary-hover w-full rounded-md p-1.5">
            Edit details
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileIntro;
