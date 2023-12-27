import Modal from "../../ui/Modal";
import SignUpForm from "./SignUpForm";

function SignUp() {
  return (
    <Modal>
      <Modal.Open opens="signup-form">
        <button className="mx-auto rounded-lg bg-green-500 px-4 py-1.5 text-lg font-bold text-white">
          Create new account
        </button>
      </Modal.Open>
      <Modal.Window name="signup-form" type="signup" alwaysClose={false}>
        <div className="flex w-full flex-col border-b p-4 text-left">
          <h1 className="text-3xl font-semibold">Sign Up</h1>
          <span className="text-gray-500">It's quick and easy.</span>
        </div>
        <SignUpForm />
      </Modal.Window>
    </Modal>
  );
}

export default SignUp;
