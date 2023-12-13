import { ChangeEvent } from "react";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { getDays, getMonths, getYears } from "../../../utils/helpers";

interface SignUpDateSelectProps {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  handleSignUpChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  error?: string;
}

function SignUpDateSelect({
  birthYear,
  birthMonth,
  birthDay,
  handleSignUpChange,
  error = "",
}: SignUpDateSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center gap-1 text-sm text-gray-500">
        <span>Birthday</span>
        <span>
          <HiMiniQuestionMarkCircle />
        </span>
      </div>
      <div className="grid grid-cols-3 justify-between gap-3">
        <select
          onChange={handleSignUpChange}
          name="birthMonth"
          value={birthMonth}
        >
          {Object.entries(getMonths()).map((month) => (
            <option value={month[0]} key={month[0]}>
              {month[1]}
            </option>
          ))}
        </select>
        <select onChange={handleSignUpChange} name="birthDay" value={birthDay}>
          {getDays(birthYear, birthMonth).map((day) => (
            <option value={day} key={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          onChange={handleSignUpChange}
          name="birthYear"
          value={birthYear}
        >
          {getYears().map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
        {error && (
          <p className="col-span-full pt-1 text-left text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUpDateSelect;
