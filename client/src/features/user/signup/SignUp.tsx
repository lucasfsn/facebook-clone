import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import SignUpForm from "./SignUpForm";

function SignUp() {
  return (
    <Modal>
      <Modal.Open opens="signup-form">
        <Button className="mx-auto bg-green-500">Create new account</Button>
      </Modal.Open>
      <Modal.Window name="signup-form" type="center">
        <SignUpForm />
      </Modal.Window>
    </Modal>
  );
}

export default SignUp;
