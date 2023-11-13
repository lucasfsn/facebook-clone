import LoginForm from "../features/authentication/Login/LoginForm";
import Logo from "../ui/Logo";

function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-gray-100 lg:flex-row lg:gap-4">
      <Logo />
      <LoginForm />
    </div>
  );
}

export default Login;
