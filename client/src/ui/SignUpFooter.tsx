import { Link } from "react-router-dom";

function SignUpFooter() {
  return (
    <div className="flex flex-col gap-3 text-xs text-gray-500">
      <p className="text-xs text-gray-500">
        People who use our service may have uploaded your contact information to
        Facebook.{" "}
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
        . You may receive SMS Notifications from us and can opt out any time.
      </p>
    </div>
  );
}

export default SignUpFooter;
