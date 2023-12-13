import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Login } from "../../../types/auth";
import Button from "../../../ui/Button";
import Spinner from "../../../ui/Spinner";
import SignUp from "../signup/SignUp";
import { useLogin } from "../useLogin";
import { getLoading } from "../userSlice";
import { loginValidation } from "../validation";
import LoginInput from "./LoginInput";

const initialState: Login = {
  email: "",
  password: "",
};

function LoginForm() {
  const { loginUser } = useLogin();
  const [user, setUser] = useState<Login>(initialState);
  const isLoading = useSelector(getLoading);

  if (isLoading) return <Spinner />;

  function handleLoginChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  }

  async function handleSubmit() {
    await loginUser(user);
  }

  loginValidation();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 text-center shadow-3xl">
        <Formik
          enableReinitialize
          initialValues={user}
          validationSchema={loginValidation}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">
            <LoginInput
              type="text"
              name="email"
              placeholder="Email or phone number"
              onChange={handleLoginChange}
            />
            <LoginInput
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleLoginChange}
            />
            <Button className="bg-blue-500">Log In</Button>
          </Form>
        </Formik>
        <Link
          to="/recover"
          className="border-b pb-5 text-sm text-blue-600 hover:underline"
        >
          Forgot password?
        </Link>
        <SignUp />
      </div>
      <Link to="/" className="px-10 py-6 text-sm">
        <span className="font-bold">Create a Page</span> for a celebrity, brand
        or business.
      </Link>
    </div>
  );
}

export default LoginForm;
