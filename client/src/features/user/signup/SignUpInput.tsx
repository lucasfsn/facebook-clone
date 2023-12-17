import { ErrorMessage, useField } from "formik";
import { HiExclamationTriangle } from "react-icons/hi2";

interface SignupInputProps {
  placeholder: string;
  name: string;
  type: string;
}

function SignUpInput({ placeholder, name, type }: SignupInputProps) {
  const [field, meta] = useField(name);

  return (
    <div className="relative w-full">
      {meta.touched && meta.error && (
        <HiExclamationTriangle className="absolute right-3 top-[10px] text-2xl text-red-500" />
      )}
      <input
        placeholder={placeholder}
        className={`w-full rounded-md border p-2 text-base focus:outline-none ${
          meta.touched && meta.error && "border-red-500"
        }`}
        type={type}
        name={name}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      <p className="pt-1 text-left text-sm text-red-500">
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </p>
    </div>
  );
}

export default SignUpInput;
