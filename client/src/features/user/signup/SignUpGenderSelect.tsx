import { ErrorMessage, useField } from "formik";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

interface SignUpGenderSelectProps {
  name: string;
}

function SignUpGenderSelect({ name }: SignUpGenderSelectProps) {
  const [field, meta] = useField(name);

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
          className={`flex cursor-pointer flex-row justify-between gap-2 rounded-[5px] border p-1 ${
            meta.touched && meta.error && "border-red-500"
          }`}
        >
          <span>Female</span>
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        </label>
        <label
          htmlFor="male"
          className={`flex cursor-pointer flex-row justify-between gap-2 rounded-[5px] border p-1 ${
            meta.touched && meta.error && "border-red-500"
          }`}
        >
          <span>Male</span>
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        </label>
        <label
          htmlFor="other"
          className={`flex cursor-pointer flex-row justify-between gap-2 rounded-[5px] border p-1 ${
            meta.touched && meta.error && "border-red-500"
          }`}
        >
          <span>Other</span>
          <input
            type="radio"
            name="gender"
            id="other"
            value="other"
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        </label>
      </div>
      <p className="w-full pt-1 text-left text-sm text-red-500">
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </p>
    </div>
  );
}

export default SignUpGenderSelect;
