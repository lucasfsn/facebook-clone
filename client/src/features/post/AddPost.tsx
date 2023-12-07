import { ReactNode } from "react";
import { IoHappyOutline, IoImages, IoVideocam } from "react-icons/io5";
import { useSelector } from "react-redux";
import Modal from "../../ui/Modal";
import { getUser } from "../user/userSlice";
import AddPostForm from "./AddPostForm";

interface AddPostProps {
  children: ReactNode;
}

function AddPost({ children }: AddPostProps) {
  const user = useSelector(getUser);

  return (
    <div className="bg-primary flex flex-col gap-2 rounded-lg p-4">
      <Modal>
        <div className="separator flex flex-row gap-2 border-b pb-3">
          <img
            src={user?.picture}
            alt={user?.firstName}
            className="h-[40px] w-auto cursor-pointer rounded-full transition-all hover:brightness-95"
          />
          <Modal.Open opens="post">
            <button className="bg-tertiary bg-tertiary-hover w-full rounded-full px-3 text-left">
              {children}
            </button>
          </Modal.Open>
          <Modal.Window name="post" type="center">
            <AddPostForm />
          </Modal.Window>
        </div>
        <div className="flex flex-row justify-around gap-0.5">
          <Modal.Open opens="post">
            <div className="bg-tertiary-hover flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm lg:px-5 lg:text-base">
              <IoVideocam className="text-xl text-red-500 lg:text-2xl" />
              <span className="whitespace-nowrap font-semibold">
                Live video
              </span>
            </div>
          </Modal.Open>
          <Modal.Open opens="post">
            <div className="bg-tertiary-hover flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm lg:px-5 lg:text-base">
              <IoImages className="text-xl text-green-500 lg:text-2xl" />
              <span className="font-semibold">Photo/video</span>
            </div>
          </Modal.Open>
          <Modal.Open opens="post">
            <div className="bg-tertiary-hover flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm lg:px-5 lg:text-base">
              <IoHappyOutline className="text-xl text-yellow-500 lg:text-2xl" />
              <span className="font-semibold">Feeling/activity</span>
            </div>
          </Modal.Open>
        </div>
      </Modal>
    </div>
  );
}

export default AddPost;
