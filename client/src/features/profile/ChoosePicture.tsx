import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { MAX_FILE_SIZE, VALID_MIMETYPES } from "../../utils/constants";
import { capitalize } from "../../utils/helpers";
import { getImages } from "../image/imagesSlice";
import EditProfilePicture from "./EditProfilePicture";

interface ChoosePictureProps {
  filter: "profile" | "cover";
}

function ChoosePicture({ filter }: ChoosePictureProps) {
  const [image, setImage] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  const images = useSelector(getImages);

  function handleAddImage(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const image = e.target.files[0];

    if (!VALID_MIMETYPES.includes(image.type)) {
      toast.error("Selected file type is not supported");
      return;
    }

    if (image.size > MAX_FILE_SIZE) {
      toast.error("Selected file is too large");
      return;
    }

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        if (e.target) {
          setImage(e.target.result as string);
        }
      };
    }
  }

  return (
    <div className="bg-primary text-secondary flex flex-col gap-3 rounded-md py-4">
      <div className="separator border-b pb-4 text-center text-xl font-bold">
        Choose {filter} picture
      </div>
      {image ? (
        <EditProfilePicture image={image} setImage={setImage} />
      ) : (
        <div className="flex flex-col gap-3 px-3">
          <button
            className="flex w-full flex-row items-center justify-center gap-1 rounded-md bg-blue-500 bg-opacity-10 py-2 font-semibold text-blue-500 hover:bg-opacity-20"
            onClick={() => {
              ref.current?.click();
            }}
          >
            <input
              type="file"
              ref={ref}
              accept="image/jpeg,image/png,image/gif"
              onChange={handleAddImage}
              hidden
            />
            <BsPlus className="text-xl" />
            <span>Upload photo</span>
          </button>
          <div className="flex flex-col gap-3">
            <p className="text-secondary text-lg font-semibold">
              {capitalize(filter)} pictures
            </p>
            <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-md">
              {images.map((image) => {
                if (image.type === filter)
                  return (
                    <img
                      key={image.url}
                      src={image.url}
                      className="aspect-square h-full w-full cursor-pointer object-cover hover:brightness-110"
                      onClick={() => setImage(image.url)}
                    />
                  );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChoosePicture;
