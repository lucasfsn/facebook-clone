import { useFormik } from "formik";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { getLoading, getUser } from "../user/userSlice";
import { changeEmailValidation } from "../user/validation";
import FormInput, { ChangeEmailData } from "./FormInput";
import { useChangeSettings } from "./useChangeSettings";

const initialState: ChangeEmailData = {
  email: "",
};

function ChangeEmailForm() {
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const { changeSettings } = useChangeSettings();

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: changeEmailValidation,
    onSubmit: handleSubmit,
  });

  if (isLoading) return <Spinner />;

  async function handleSubmit(values: ChangeEmailData) {
    await changeSettings(user?.email, "email", values.email);
  }

  return (
    <div className="bg-primary flex flex-col gap-4 rounded-md p-4 shadow-lg">
      <div className="text-secondary separator border-b pb-2 text-lg font-semibold">
        Change Email
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-row justify-between gap-2"
      >
        <FormInput<ChangeEmailData>
          placeholder="New email"
          type="text"
          name="email"
          formik={formik}
        />

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

export default ChangeEmailForm;
