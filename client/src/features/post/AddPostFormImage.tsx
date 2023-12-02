import { Dispatch, SetStateAction, useRef } from "react";
import { HiXMark } from "react-icons/hi2";
import { MdAddPhotoAlternate } from "react-icons/md";

interface AddPostFormImageProps {
  image: string[];
  setImage: Dispatch<SetStateAction<string[]>>;
  setShowAddImage: Dispatch<SetStateAction<boolean>>;
}

function AddPostFormImage({
  image,
  setImage,
  setShowAddImage,
}: AddPostFormImageProps) {
  const imageRef = useRef<HTMLInputElement>(null);

  function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="separator rounded-md border p-2">
      <div className="bg-tertiary bg-tertiary-hover relative h-40 cursor-pointer rounded-md">
        <button
          className="bg-tertiary-hover bg-primary absolute right-1 top-1 cursor-pointer rounded-full p-1"
          onClick={() => setShowAddImage(false)}
        >
          <HiXMark className="text-xl text-gray-400" />
        </button>
        <input
          type="file"
          multiple
          hidden
          ref={imageRef}
          onChange={handleAddImage}
        />
        <img src={image[0]} alt="" />
        <div
          className="flex h-full flex-col items-center justify-center"
          onClick={() => {
            imageRef.current?.click();
          }}
        >
          <div className="w-fit rounded-full bg-neutral-600 p-2 text-2xl shadow-md">
            <MdAddPhotoAlternate className="translate-x-[0.05rem]" />
          </div>
          <span>Add Photos/Videos</span>
          <span className="text-tertiary text-xs">or drag and drop</span>
        </div>
      </div>
    </div>
  );
}

export default AddPostFormImage;
