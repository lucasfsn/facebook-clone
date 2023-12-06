import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { useMoveBack } from "../../hooks/useMoveBack";
import Modal from "../../ui/Modal";
import { getUser } from "../user/userSlice";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangeNameForm from "./ChangeNameForm";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccountForm from "./DeleteAccountForm";

function UserSettings() {
  const user = useSelector(getUser);
  const moveBack = useMoveBack();

  return (
    <div className="text-secondary flex h-max w-full flex-col justify-between gap-10 self-start p-5">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-semibold">
          Hello, {user?.firstName}!
        </span>
        <span className="text-2xl font-semibold">
          Here you can easily edit your settings 😊
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Modal>
          <div className="flex w-[150px] flex-row items-center justify-between gap-2 text-xl">
            <span>First name</span>
            <Modal.Open opens="firstName">
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
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
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
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
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
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
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
                <IoIosArrowForward />
              </button>
            </Modal.Open>
            <Modal.Window name="password" type="center" width="375px">
              <ChangePasswordForm />
            </Modal.Window>
          </div>
          <div className="flex flex-row items-center gap-2 self-end text-rose-900">
            <Modal.Open opens="deleteAccount">
              <button className="bg-primary bg-tertiary-hover shake flex rounded-full p-2 text-lg">
                <IoIosArrowBack />
              </button>
            </Modal.Open>
            <Modal.Window name="deleteAccount" type="center">
              <DeleteAccountForm />
            </Modal.Window>
            <span>Delete account</span>
          </div>
        </Modal>
      </div>
      <button
        onClick={moveBack}
        className="self-start font-semibold text-blue-500 hover:underline"
      >
        Go Back
      </button>
    </div>
  );
}

export default UserSettings;
