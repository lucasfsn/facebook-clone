import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { ChangePasswordData } from "../../types/settings";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { getLoading, getUser } from "../user/userSlice";
import { changePasswordValidation } from "../user/validation";
import FormInput from "./FormInput";
import { useChangePassword } from "./useChangePassword";

const initialState: ChangePasswordData = {
  password: "",
  confirmPassword: "",
};

function ChangePasswordForm() {
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const { changePassword } = useChangePassword();

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: changePasswordValidation,
    onSubmit: handleSubmit,
  });

  if (isLoading) return <Spinner />;

  async function handleSubmit(values: ChangePasswordData) {
    await changePassword(user?.email, values.password);
  }

  return (
    <div className="bg-primary flex flex-col gap-4 rounded-md p-4 shadow-lg">
      <div className="text-secondary separator border-b pb-2 text-lg font-semibold">
        Change Password
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col gap-4"
      >
        <div className="flex flex-col gap-3">
          <FormInput<ChangePasswordData>
            placeholder="New password"
            type="password"
            name="password"
            formik={formik}
          />
          <FormInput
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            formik={formik}
          />
        </div>
        <Button
          className="bg-post-disabled h-fit bg-blue-500 text-sm hover:bg-blue-600 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Change
        </Button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
