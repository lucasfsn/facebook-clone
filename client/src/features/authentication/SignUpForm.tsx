import axios from "axios";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ButtonForm from "../../ui/ButtonForm";
import Spinner from "../../ui/Spinner";
import SignUpDateSelect from "./SignUpDateSelect";
import SignUpGenderSelect from "./SignUpGenderSelect";
import SignUpInput from "./SignUpInput";
import { signUpValidation } from "./validation";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  gender: string;
}

const initialSignUpData: SignUpData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthDay: new Date().getDate(),
  birthMonth: new Date().getMonth() + 1,
  birthYear: new Date().getFullYear(),
  gender: "",
};

function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState<SignUpData>(initialSignUpData);
  const [errors, setErrors] = useState({
    date: "",
    gender: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  async function handleSignUpSubmit() {
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

    try {
      setIsLoading(true);
      const { data } = await axios.post(`${apiUrl}/signup`, user);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message, ...rest } = data;

      toast.success(data.message);
      dispatch({ type: "user/login", payload: rest });
      Cookies.set("user", JSON.stringify(rest));

      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message || "Error has occured!");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(data: SignUpData) {
    const minAge = new Date().getFullYear() - 13;

    if (data.birthYear > minAge)
      setErrors((err) => ({
        ...err,
        date: "It looks like you entered the wrong info. Please be sure to use your real birthday.",
      }));

    if (!data.gender)
      setErrors((err) => ({
        ...err,
        gender:
          "Please choose a gender. You can change who can see this later.",
      }));

    !errors.date && !errors.gender && handleSignUpSubmit();
  }

  signUpValidation();

  return (
    <>
      <div className="flex w-full flex-col border-b p-4 text-left">
        <h1 className="text-3xl font-semibold">Sign Up</h1>
        <span className="text-gray-500">It's quick and easy.</span>
      </div>
      <div className="flex flex-col gap-3 p-3">
        <Formik
          enableReinitialize
          initialValues={user}
          validationSchema={signUpValidation}
          onSubmit={(values) => handleSubmit(values)}
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
            <div className="flex flex-col gap-3 text-xs text-gray-500">
              <p className="text-xs text-gray-500">
                People who use our service may have uploaded your contact
                information to Facebook.{" "}
                <Link
                  to="https://www.facebook.com/help/637205020878504"
                  className="text-blue-600 hover:underline"
                >
                  Learn more.
                </Link>
              </p>
              <p>
                By clicking Sign Up, you agree to our{" "}
                <Link
                  to="https://www.facebook.com/legal/terms/update"
                  className="text-blue-600 hover:underline"
                >
                  Terms
                </Link>
                . Learn how we collect, use and share your data in our{" "}
                <Link
                  to="https://www.facebook.com/about/privacy/update"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and how we use cookies and similar technology in our{" "}
                <Link
                  to="https://www.facebook.com/policies/cookies/"
                  className="text-blue-600 hover:underline"
                >
                  Cookies Policy
                </Link>
                . You may receive SMS Notifications from us and can opt out any
                time.
              </p>
            </div>
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
