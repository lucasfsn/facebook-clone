import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-gray-100 lg:flex-row lg:gap-4">
      <div className="flex flex-col gap-4">
        <img
          src="../../logo/facebook.svg"
          alt="facebook"
          className="mx-auto w-[250px] lg:mx-0"
        />
        <p className="max-w-sm text-center text-2xl lg:max-w-md lg:text-left lg:text-3xl">
          Connect with friends and the world around you on Facebook.
        </p>
      </div>
      <div className="flex flex-col">
        <div className="shadow-3xl flex flex-col gap-4 rounded-lg bg-white p-4 text-center">
          <Formik>
            {(formik) => (
              <Form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Email"
                  className="rounded-md border p-3.5 text-lg focus:outline-blue-400"
                />
                <input
                  type="text"
                  placeholder="Password"
                  className="rounded-md border p-3.5 text-lg focus:outline-blue-400"
                />
                <Button className="bg-blue-500">Log In</Button>
              </Form>
            )}
          </Formik>
          <Link
            to="/recover"
            className="border-b pb-5 text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
          <Button className="mx-auto bg-green-500">Create new account</Button>
        </div>
        <Link to="/" className="px-10 py-6 text-sm">
          <span className="font-bold">Create a Page</span> for a celebrity,
          brand or business.
        </Link>
      </div>
    </div>
  );
}

export default Login;
