import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import ChangePasswordInput from "./ChangePasswordInput";
import { useChangePassword } from "./useChangePassword";
import { getLoading, getUser } from "./userSlice";
import { changePasswordValidation } from "./validation";

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
    <div className="bg-primary flex w-[400px] flex-col items-center gap-4 rounded-lg p-4 shadow-lg">
      <div className="text-xl font-semibold">Change Password</div>
      <Formik
        enableReinitialize
        initialValues={initialState}
        validationSchema={changePasswordValidation}
        onSubmit={handleSubmit}
      >
        <Form className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-3">
            <ChangePasswordInput
              placeholder="New password"
              type="password"
              name="password"
            />
            <ChangePasswordInput
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
            />
          </div>
          <Button className="mx-auto bg-blue-500 hover:bg-blue-600">
            Change
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default ChangePasswordForm;
