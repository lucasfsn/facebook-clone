import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { SignUp } from "../../../types/auth";
import Button from "../../../ui/Button";
import Spinner from "../../../ui/Spinner";
import { useSignup } from "../useSignup";
import { getLoading } from "../userSlice";
import { signUpValidation } from "../validation";
import SignUpDateSelect from "./SignUpDateSelect";
import SignUpFooter from "./SignUpFooter";
import SignUpGenderSelect from "./SignUpGenderSelect";
import SignUpHeader from "./SignUpHeader";
import SignUpInput from "./SignUpInput";

const initialState: SignUp = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthDay: new Date().getDate(),
  birthMonth: new Date().getMonth(),
  birthYear: new Date().getFullYear(),
  gender: "",
};

function SignUpForm() {
  const { signUpUser } = useSignup();
  const isLoading = useSelector(getLoading);

  if (isLoading) return <Spinner />;

  async function handleSubmit(values: SignUp) {
    await signUpUser(values);
  }

  return (
    <>
      <SignUpHeader />
      <div className="flex flex-col gap-3 p-3">
        <Formik
          enableReinitialize
          initialValues={initialState}
          validationSchema={signUpValidation}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-row justify-between gap-3">
              <SignUpInput
                placeholder="First name"
                type="text"
                name="firstName"
              />
              <SignUpInput
                placeholder="Last name"
                type="text"
                name="lastName"
              />
            </div>
            <SignUpInput placeholder="Email" type="text" name="email" />
            <SignUpInput
              placeholder="New password"
              type="password"
              name="password"
            />
            <SignUpDateSelect />
            <SignUpGenderSelect name="gender" />
            <SignUpFooter />
            <Button className="mx-auto my-4 w-1/2 bg-green-500 hover:bg-green-600">
              Sign Up
            </Button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default SignUpForm;
