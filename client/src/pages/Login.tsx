import LoginForm from "../features/authentication/LoginForm";
import SignUpForm from "../features/authentication/SignUpForm";
import Logo from "../ui/Logo";

function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-gray-100 lg:flex-row lg:gap-4">
      <Logo />
      <SignUpForm />
      <LoginForm />
    </div>
  );
}

export default Login;
