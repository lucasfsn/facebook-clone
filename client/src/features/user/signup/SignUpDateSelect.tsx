import { ErrorMessage, useField, useFormikContext } from "formik";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { getDays, getMonths, getYears } from "../../../utils/helpers";

interface BirthDate {
  birthDay: number;
  birthMonth: number;
  birthYear: number;
}

function SignUpDateSelect() {
  const { values } = useFormikContext<BirthDate>();
  const { birthDay, birthMonth, birthYear } = values;

  const [field, meta] = useField("birthYear");

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
          onChange={field.onChange}
          onBlur={field.onBlur}
          name="birthMonth"
          value={birthMonth}
          className={`focus:outline-none ${
            meta.touched && meta.error && "border-red-500"
          }`}
        >
          {Object.entries(getMonths()).map((month) => (
            <option value={month[0]} key={month[0]}>
              {month[1]}
            </option>
          ))}
        </select>
        <select
          onChange={field.onChange}
          onBlur={field.onBlur}
          name="birthDay"
          value={birthDay}
          className={`focus:outline-none ${
            meta.touched && meta.error && "border-red-500"
          }`}
        >
          {getDays(birthYear, birthMonth).map((day) => (
            <option value={day} key={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          onChange={field.onChange}
          onBlur={field.onBlur}
          name="birthYear"
          value={birthYear}
          className={`focus:outline-none ${
            meta.touched && meta.error && "border-red-500"
          }`}
        >
          {getYears().map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <p className="w-full pt-1 text-left text-sm text-red-500">
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </p>
    </div>
  );
}

export default SignUpDateSelect;
