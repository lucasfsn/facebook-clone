import { ErrorMessage, useField } from "formik";
import { HiExclamationTriangle } from "react-icons/hi2";

interface ChangePasswordInputProps {
  placeholder: string;
  name: string;
  type: string;
}

function ChangePasswordInput({
  placeholder,
  type,
  ...props
}: ChangePasswordInputProps) {
  const [field, meta] = useField(props);

  return (
    <div className="relative max-w-[400px]">
      {meta.touched && meta.error && (
        <HiExclamationTriangle className="absolute right-3 top-[10px] text-2xl text-red-500" />
      )}
      <input
        placeholder={placeholder}
        type={type}
        {...field}
        className={`w-full rounded-md border p-2 text-base focus:outline-none ${
          meta.touched && meta.error && "border-red-500"
        }`}
      />
      <p className="pt-1 text-left text-sm text-red-500">
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </p>
    </div>
  );
}

export default ChangePasswordInput;
