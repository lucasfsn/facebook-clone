import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { SignUpData } from "../../../services/apiAuth";
import { RootState } from "../../../store";
import Button from "../../../ui/Button";
import SignUpFooter from "../../../ui/SignUpFooter";
import SignUpHeader from "../../../ui/SignUpHeader";
import Spinner from "../../../ui/Spinner";
import { useSignup } from "../useSignup";
import { signUpValidation } from "../validation";
import SignUpDateSelect from "./SignUpDateSelect";
import SignUpGenderSelect from "./SignUpGenderSelect";
import SignUpInput from "./SignUpInput";

const initialState: SignUpData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthDay: new Date().getDate(),
  birthMonth: new Date().getMonth() + 1,
  birthYear: new Date().getFullYear(),
  gender: "",
};

const initialStateErrors = {
  date: "",
  gender: "",
};

function SignUpForm() {
  const { signUpUser } = useSignup();
  const [user, setUser] = useState<SignUpData>(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const isLoading = useSelector((state: RootState) => state.user?.isLoading);

  if (isLoading) return <Spinner />;

  function handleSignUpChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    name === "birthYear" || name === "birthMonth" || name === "birthDay"
      ? setUser({ ...user, [name]: Number(value) })
      : setUser({ ...user, [name]: value });

    setErrors({
      date: "",
      gender: "",
    });
  }

  async function handleSubmit() {
    const minAge = new Date().getFullYear() - 13;

    if (user.birthYear > minAge) {
      setErrors((err) => ({
        ...err,
        date: "It looks like you entered the wrong info. Please be sure to use your real birthday.",
      }));
      return;
    }

    if (!user.gender) {
      setErrors((err) => ({
        ...err,
        gender:
          "Please choose a gender. You can change who can see this later.",
      }));
      return;
    }

    await signUpUser(user);
  }

  signUpValidation();

  return (
    <>
      <SignUpHeader />
      <div className="flex flex-col gap-3 p-3">
        <Formik
          enableReinitialize
          initialValues={user}
          validationSchema={signUpValidation}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-row gap-3">
              <SignUpInput
                placeholder="First name"
                type="text"
                name="firstName"
                onChange={handleSignUpChange}
              />
              <SignUpInput
                placeholder="Last name"
                type="text"
                name="lastName"
                onChange={handleSignUpChange}
              />
            </div>
            <SignUpInput
              placeholder="Mobile number or email"
              type="text"
              name="email"
              onChange={handleSignUpChange}
            />
            <SignUpInput
              placeholder="New password"
              type="password"
              name="password"
              onChange={handleSignUpChange}
            />
            <SignUpDateSelect
              birthYear={user.birthYear}
              birthMonth={user.birthMonth}
              birthDay={user.birthDay}
              handleSignUpChange={handleSignUpChange}
              error={errors.date}
            />
            <SignUpGenderSelect
              handleSignUpChange={handleSignUpChange}
              error={errors.gender}
            />
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
