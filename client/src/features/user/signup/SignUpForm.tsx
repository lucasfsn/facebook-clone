import axios from "axios";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUpData, signup } from "../../../services/apiAuth";
import ButtonForm from "../../../ui/ButtonForm";
import SignUpFooter from "../../../ui/SignUpFooter";
import SignUpHeader from "../../../ui/SignUpHeader";
import Spinner from "../../../ui/Spinner";
import { signUpValidation } from "../validation";
import SignUpDateSelect from "./SignUpDateSelect";
import SignUpGenderSelect from "./SignUpGenderSelect";
import SignUpInput from "./SignUpInput";

interface Props {
  isLoading: boolean;
  setIsLoading: (arg: boolean) => void;
}

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

function SignUpForm({ isLoading, setIsLoading }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<SignUpData>(initialState);
  const [errors, setErrors] = useState({
    date: "",
    gender: "",
  });

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

    try {
      setIsLoading(true);

      const { message, signUpData } = await signup(user);

      toast.success(message);
      dispatch({ type: "user/login", payload: signUpData });
      Cookies.set("user", JSON.stringify(signUpData));

      navigate("/");
    } catch (err) {
      axios.isAxiosError(err)
        ? toast.error(err.response?.data?.message)
        : toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
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
            <ButtonForm
              type="submit"
              className="mx-auto my-4 w-1/2 bg-green-500 hover:bg-green-600"
            >
              Sign Up
            </ButtonForm>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default SignUpForm;
