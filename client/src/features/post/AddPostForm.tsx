import { useState } from "react";
import { FaLock, FaUserTag } from "react-icons/fa";
import { IoIosImages, IoMdArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import { getUser } from "../user/userSlice";
import AddPostFormImage from "./AddPostFormImage";
import AddPostFormText from "./AddPostFormText";

function AddPostForm() {
  const [post, setPost] = useState<string>("");
  const [image, setImage] = useState<string[]>([]);
  const [showAddImage, setShowAddImage] = useState<boolean>(false);
  console.log(image);

  const user = useSelector(getUser);

  return (
    <div className="bg-primary text-secondary flex flex-col gap-3 rounded-md">
      <div className="separator border-b p-3 text-center text-xl font-bold">
        Create post
      </div>
      <div className="flex flex-col gap-3 px-3 pb-3">
        <div className="flex flex-row items-center gap-2">
          <img
            src={user?.picture}
            alt={user?.firstName}
            className="h-[40px] w-auto cursor-pointer rounded-full transition-all hover:brightness-95"
          />
          <div className="flex flex-col gap-0.5">
            <span>
              {user?.firstName} {user?.lastName}
            </span>
            <div className="bg-tertiary flex cursor-pointer flex-row items-center justify-center gap-1 rounded-md px-2 py-0.5 text-sm">
              {/* <FaGlobeEurope /> */}
              <FaLock className="text-xs" />
              <span>Only me</span>
              <IoMdArrowDropdown />
            </div>
          </div>
        </div>
        <AddPostFormText
          firstName={user?.firstName}
          post={post}
          setPost={setPost}
          isShowingImage={showAddImage}
        />
        {showAddImage && (
          <AddPostFormImage
            image={image}
            setImage={setImage}
            setShowAddImage={setShowAddImage}
          />
        )}
        <div className="separator flex flex-row items-center justify-between rounded-lg border px-4 py-2.5">
          <span className="font-semibold">Add to your post</span>
          <div className="flex flex-row gap-2 text-2xl">
            <div
              className="bg-tertiary-hover flex cursor-pointer items-center justify-center rounded-full p-1.5"
              onClick={() => setShowAddImage(true)}
            >
              <IoIosImages className="text-green-500" />
            </div>
            <div className="bg-tertiary-hover flex cursor-pointer items-center justify-center rounded-full p-1.5">
              <FaUserTag className="translate-x-0.5 text-blue-600" />
            </div>
          </div>
        </div>
        <Button
          className="bg-blue-600 text-sm disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:text-neutral-500"
          disabled={!post}
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default AddPostForm;
