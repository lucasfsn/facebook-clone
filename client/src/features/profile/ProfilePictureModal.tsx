import { RefObject, useState } from "react";
import { BsPersonSquare } from "react-icons/bs";
import { IoIosImages } from "react-icons/io";
import { useSelector } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import ImageSlider from "../../ui/ImageSlider";
import Modal from "../../ui/Modal";
import ChooseProfilePicture from "./ChooseProfilePicture";
import { getProfilePicture } from "./profileSlice";

interface ProfilePictureModalProps {
  button: RefObject<HTMLImageElement>;
  close: () => void;
}

function ProfilePictureModal({ button, close }: ProfilePictureModalProps) {
  const profilePicture = useSelector(getProfilePicture);
  const { ref } = useOutsideClick(close, true, button);
  const [showSlider, setShowSlider] = useState<boolean>(false);

  function handleCloseSlider() {
    setShowSlider(false);
  }

  return (
    <>
      {showSlider && (
        <ImageSlider images={[profilePicture]} close={handleCloseSlider} />
      )}
      <div
        className="bg-primary text-secondary absolute bottom-0 left-0 z-10 flex w-[300px] translate-y-[80px] flex-col rounded-lg p-2 shadow-3xl"
        ref={ref}
      >
        <div
          className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1"
          onClick={() => setShowSlider(true)}
        >
          <BsPersonSquare />
          <span>See profile picture</span>
        </div>
        <Modal>
          <Modal.Open opens="picture">
            <div className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1">
              <IoIosImages />
              <span>Choose profile picture</span>
            </div>
          </Modal.Open>
          <Modal.Window name="picture" type="center">
            <ChooseProfilePicture />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default ProfilePictureModal;
