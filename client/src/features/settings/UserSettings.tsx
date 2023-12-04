import { IoIosArrowForward } from "react-icons/io";
import Modal from "../../ui/Modal";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangeNameForm from "./ChangeNameForm";
import ChangePasswordForm from "./ChangePasswordForm";

function UserSettings() {
  return (
    <div className="text-secondary flex flex-col gap-5 self-start">
      <span className="text-2xl font-semibold">Edit your data</span>
      <div className="flex flex-col gap-3">
        <Modal>
          <div className="flex w-[150px] flex-row items-center justify-between gap-2 text-xl">
            <span>First name</span>
            <Modal.Open opens="firstName">
              <button className="bg-primary bg-tertiary-hover flex rounded-full p-2 text-lg">
                <IoIosArrowForward />
              </button>
            </Modal.Open>
            <Modal.Window name="firstName" type="center" width="375px">
              <ChangeNameForm field="firstName" />
            </Modal.Window>
          </div>
          <div className="flex w-[150px] flex-row items-center justify-between gap-2 text-xl">
            <span>Last name</span>
            <Modal.Open opens="lastName">
              <button className="bg-primary bg-tertiary-hover flex rounded-full p-2 text-lg">
                <IoIosArrowForward />
              </button>
            </Modal.Open>
            <Modal.Window name="lastName" type="center" width="375px">
              <ChangeNameForm field="lastName" />
            </Modal.Window>
          </div>
          <div className="flex w-[150px] flex-row items-center justify-between gap-2 text-xl">
            <span>Email</span>
            <Modal.Open opens="email">
              <button className="bg-primary bg-tertiary-hover flex rounded-full p-2 text-lg">
                <IoIosArrowForward />
              </button>
            </Modal.Open>
            <Modal.Window name="email" type="center" width="375px">
              <ChangeEmailForm />
            </Modal.Window>
          </div>
          <div className="flex w-[150px] flex-row items-center justify-between gap-2 text-xl">
            <span>Password</span>
            <Modal.Open opens="password">
              <button className="bg-primary bg-tertiary-hover flex rounded-full p-2 text-lg">
                <IoIosArrowForward />
              </button>
            </Modal.Open>
            <Modal.Window name="password" type="center" width="375px">
              <ChangePasswordForm />
            </Modal.Window>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default UserSettings;
