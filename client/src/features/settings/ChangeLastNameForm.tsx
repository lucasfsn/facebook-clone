import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { getLoading, getUser } from "../user/userSlice";
import { changeNameValidation } from "../user/validation";
import ChangeUserDataInput from "./ChangeUserDataInput";
import { useChangeSettings } from "./useChangeSettings";

interface ChangeNameData {
  name: string;
}

const initialState: ChangeNameData = {
  name: "",
};

function ChangeLastNameForm() {
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const { changeSettings } = useChangeSettings();

  if (isLoading) return <Spinner />;

  async function handleSubmit(values: ChangeNameData) {
    await changeSettings(user?.email, "lastName", values.name);
  }

  return (
    <div className="bg-primary flex flex-col items-center gap-4 rounded-md p-4 shadow-lg">
      <div className="text-secondary text-lg font-semibold">
        Change Last name
      </div>
      <Formik
        enableReinitialize
        initialValues={initialState}
        validationSchema={changeNameValidation}
        onSubmit={handleSubmit}
      >
        <Form className="flex w-full flex-row justify-between gap-2">
          <ChangeUserDataInput
            placeholder="Last name"
            type="text"
            name="name"
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

export default ChangeLastNameForm;
