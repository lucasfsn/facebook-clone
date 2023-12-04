import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { getLoading, getUser } from "../user/userSlice";
import { changeEmailValidation } from "../user/validation";
import ChangeUserDataInput from "./ChangeUserDataInput";
import { useChangeSettings } from "./useChangeSettings";

interface ChangeEmailData {
  email: string;
}

const initialState: ChangeEmailData = {
  email: "",
};

function ChangeEmailForm() {
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const { changeSettings } = useChangeSettings();

  if (isLoading) return <Spinner />;

  async function handleSubmit(values: ChangeEmailData) {
    await changeSettings(user?.email, "email", values.email);
  }

  return (
    <div className="bg-primary flex flex-col items-center gap-4 rounded-lg p-4 shadow-lg">
      <div className="text-secondary text-lg font-semibold">Change Email</div>
      <Formik
        enableReinitialize
        initialValues={initialState}
        validationSchema={changeEmailValidation}
        onSubmit={handleSubmit}
      >
        <Form className="flex w-full flex-row justify-between gap-2">
          <ChangeUserDataInput
            placeholder="New email"
            type="text"
            name="email"
          />

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

export default ChangeEmailForm;
