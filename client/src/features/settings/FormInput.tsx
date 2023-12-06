import { FormikProps } from "formik";
import { HiExclamationTriangle } from "react-icons/hi2";

export interface ChangePasswordData {
  [key: string]: string;
  password: string;
  confirmPassword: string;
}

export interface ChangeNameData {
  [key: string]: string;
  name: string;
}

export interface ChangeEmailData {
  [key: string]: string;
  email: string;
}

type FormInputData = {
  [key: string]: string;
} & (ChangePasswordData | ChangeNameData | ChangeEmailData);

interface FormInputProps<T extends FormInputData> {
  placeholder: string;
  name: string;
  type: string;
  formik: FormikProps<T>;
}
function FormInput<T extends FormInputData>({
  placeholder,
  type,
  name,
  formik,
}: FormInputProps<T>) {
  return (
    <div className="relative w-full">
      {formik.touched[name] && formik.errors[name] && (
        <HiExclamationTriangle className="absolute right-2 top-[6px] text-2xl text-red-500" />
      )}
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`bg-tertiary text-secondary separator w-full rounded-md border px-2 py-1 text-base focus:outline-none ${
          formik.touched[name] && formik.errors[name] && "border-red-500"
        }`}
      />
      {formik.touched[name] && (
        <p className="pt-1 text-left text-sm text-red-500">
          {formik.errors[name]?.toString()}
        </p>
      )}
    </div>
  );
}

export default FormInput;
