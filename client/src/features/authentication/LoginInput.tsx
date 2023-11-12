import { ErrorMessage, FieldAttributes, useField } from "formik";
import { HiExclamationTriangle } from "react-icons/hi2";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface LoginInputProps extends FieldAttributes<any> {
  placeholder: string;
  name: string;
}

function LoginInput({ placeholder, ...props }: LoginInputProps) {
  const [field, meta] = useField(props);
  return (
    <div className="relative">
      {meta.touched && meta.error && (
        <HiExclamationTriangle className="absolute right-3 top-[16px] text-2xl text-red-500" />
      )}
      <input
        placeholder={placeholder}
        className={`w-full rounded-md border p-3.5 text-lg focus:outline-none ${
          meta.touched && meta.error ? "border-red-500" : "border-blue-500"
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

export default LoginInput;
