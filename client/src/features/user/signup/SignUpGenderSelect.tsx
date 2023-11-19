import { ChangeEvent } from "react";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

interface Props {
  handleSignUpChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  error?: string;
}

function SignUpGenderSelect({ handleSignUpChange, error = "" }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center gap-1 text-sm text-gray-500">
        <span>Gender</span>
        <span>
          <HiMiniQuestionMarkCircle />
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <label
          htmlFor="female"
          className="flex cursor-pointer flex-row justify-between gap-2 rounded-[5px] border p-1"
        >
          <span>Female</span>
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            onChange={handleSignUpChange}
          />
        </label>
        <label
          htmlFor="male"
          className="flex cursor-pointer flex-row justify-between gap-2 rounded-[5px] border p-1"
        >
          <span>Male</span>
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            onChange={handleSignUpChange}
          />
        </label>
        <label
          htmlFor="other"
          className="flex cursor-pointer flex-row justify-between gap-2 rounded-[5px] border p-1"
        >
          <span>Other</span>
          <input
            type="radio"
            name="gender"
            id="other"
            value="other"
            onChange={handleSignUpChange}
          />
        </label>
        {error && (
          <p className="col-span-full pt-1 text-left text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUpGenderSelect;
