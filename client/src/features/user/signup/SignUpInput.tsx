import { ErrorMessage, useField } from "formik";
import { ChangeEvent } from "react";
import { HiExclamationTriangle } from "react-icons/hi2";

interface LoginInputProps {
  placeholder: string;
  name: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function SignUpInput({ placeholder, ...props }: LoginInputProps) {
  const [field, meta] = useField(props);

  return (
    <div className="relative">
      {meta.touched && meta.error && (
        <HiExclamationTriangle className="absolute right-3 top-[10px] text-2xl text-red-500" />
      )}
      <input
        placeholder={placeholder}
        className={`w-full rounded-md border p-2 text-base focus:outline-none ${
          meta.touched && meta.error && "border-red-500"
        }`}
        {...field}
        {...props}
      />
      <p className="pt-1 text-left text-sm text-red-500">
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </p>
    </div>
  );
}

export default SignUpInput;
