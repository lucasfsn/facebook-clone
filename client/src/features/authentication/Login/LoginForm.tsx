import axios from "axios";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginData, login } from "../../../services/apiAuth";
import ButtonForm from "../../../ui/ButtonForm";
import Spinner from "../../../ui/Spinner";
import SignUp from "../SignUp/SignUp";
import { loginValidation } from "../validation";
import LoginInput from "./LoginInput";

const initialState: LoginData = {
  email: "",
  password: "",
};

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<LoginData>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) return <Spinner />;

  function handleLoginChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  }

  async function handleSubmit() {
    try {
      setIsLoading(true);

      const { message, loginData } = await login(user);

      toast.success(message);
      dispatch({ type: "user/login", payload: loginData });
      Cookies.set("user", JSON.stringify(loginData));

      navigate("/");
    } catch (err) {
      axios.isAxiosError(err)
        ? toast.error(err.response?.data?.message)
        : toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  loginValidation();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 text-center shadow-3xl">
        <Formik
          enableReinitialize
          initialValues={login}
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
            <ButtonForm type="submit" className="bg-blue-500">
              Log In
            </ButtonForm>
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
