import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import LoginInput from "./LoginInput";
import { loginValidation } from "./validation";

interface LoginData {
  email: string;
  password: string;
}

function LoginForm() {
  const [login, setLogin] = useState<LoginData>({
    email: "",
    password: "",
  });

  function handleLoginChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setLogin({ ...login, [name]: value });
  }

  loginValidation();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 text-center shadow-3xl">
        <Formik
          enableReinitialize
          initialValues={login}
          validationSchema={loginValidation}
          onSubmit={(values) => {
            console.log(values);
          }}
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
            <Button type="submit" className="bg-blue-500">
              Log In
            </Button>
          </Form>
        </Formik>
        <Link
          to="/recover"
          className="border-b pb-5 text-sm text-blue-600 hover:underline"
        >
          Forgot password?
        </Link>
        <Button type="submit" className="mx-auto bg-green-500">
          Create new account
        </Button>
      </div>
      <Link to="/" className="px-10 py-6 text-sm">
        <span className="font-bold">Create a Page</span> for a celebrity, brand
        or business.
      </Link>
    </div>
  );
}

export default LoginForm;
