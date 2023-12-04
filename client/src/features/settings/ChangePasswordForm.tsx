import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { getLoading, getUser } from "../user/userSlice";
import { changePasswordValidation } from "../user/validation";
import ChangeUserDataInput from "./ChangeUserDataInput";
import { useChangePassword } from "./useChangePassword";

interface ChangePasswordData {
  password: string;
  confirmPassword: string;
}

const initialState: ChangePasswordData = {
  password: "",
  confirmPassword: "",
};

function ChangePasswordForm() {
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const { changePassword } = useChangePassword();

  if (isLoading) return <Spinner />;

  async function handleSubmit(values: ChangePasswordData) {
    await changePassword(user?.email, values.password);
  }

  return (
    <div className="bg-primary flex flex-col items-center gap-4 rounded-md p-4 shadow-lg">
      <div className="text-secondary text-lg font-semibold">
        Change Password
      </div>
      <Formik
        enableReinitialize
        initialValues={initialState}
        validationSchema={changePasswordValidation}
        onSubmit={handleSubmit}
      >
        <Form className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-3">
            <ChangeUserDataInput
              placeholder="New password"
              type="password"
              name="password"
            />
            <ChangeUserDataInput
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
            />
          </div>
          <Button
            className="bg-post-disabled h-fit bg-blue-500 hover:bg-blue-600 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Change
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default ChangePasswordForm;
