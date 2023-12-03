import { useState } from "react";
import { FaLock, FaUserTag } from "react-icons/fa";
import { IoIosImages, IoMdArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import { getUser } from "../user/userSlice";
import AddPostFormImage from "./AddPostFormImage";
import AddPostFormText from "./AddPostFormText";
import { getError, getLoading } from "./postSlice";
import { useAddPost } from "./useAddPost";

function AddPostForm() {
  const { createPostWithImages, createPost } = useAddPost();

  const [post, setPost] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [showAddImage, setShowAddImage] = useState<boolean>(false);

  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const error = useSelector(getError);

  async function handlePostSubmit() {
    images.length !== 0
      ? await createPostWithImages(
          {
            content: post,
            images,
            user: user?.id,
          },
          user?.username,
        )
      : await createPost({ content: post, user: user?.id });

    if (error) return;

    setPost("");
    setImages([]);
    setShowAddImage(false);
  }

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
        <div className="max-h-[200px] overflow-y-scroll">
          {showAddImage && (
            <AddPostFormImage
              images={images}
              setImages={setImages}
              setShowAddImage={setShowAddImage}
            />
          )}
        </div>
        <div className="separator flex flex-row items-center justify-between rounded-lg border px-4 py-2.5">
          <span className="font-semibold">Add to your post</span>
          <div className="flex flex-row gap-2 text-2xl">
            <div
              className={`bg-tertiary-hover flex cursor-pointer items-center justify-center rounded-full p-1.5 ${
                showAddImage ? "bg-tertiary" : ""
              }`}
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
          className={`bg-post-disabled bg-blue-600 text-sm disabled:cursor-not-allowed disabled:text-neutral-500 ${
            isLoading ? "h-[2rem]" : ""
          }`}
          disabled={(!post && images.length === 0) || isLoading}
          onClick={handlePostSubmit}
        >
          {isLoading ? <Loader /> : "Post"}
        </Button>
      </div>
    </div>
  );
}

export default AddPostForm;
