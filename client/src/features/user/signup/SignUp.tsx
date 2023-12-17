import Modal from "../../../ui/Modal";
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
        <SignUpForm />
      </Modal.Window>
    </Modal>
  );
}

export default SignUp;
