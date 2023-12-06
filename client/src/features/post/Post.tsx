import { formatDistanceToNow } from "date-fns";
import { useRef, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaGlobeEurope } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoArrowRedoOutline, IoChatbubbleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import ReactionsModal from "../../ui/ReactionsModal";
import { ProfileRes } from "../profile/profileSlice";
import { getUserId } from "../user/userSlice";
import AddComment from "./AddComment";
import PostImages from "./PostImages";
import PostMenu from "./PostMenu";
import { PostRes } from "./postSlice";

type PostCreator = Partial<ProfileRes> | undefined;

interface PostProps {
  post: PostRes;
  postCreator: PostCreator;
}

function Post({ post, postCreator }: PostProps) {
  const [activeLike, setActiveLike] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const userId = useSelector(getUserId);

  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleShowMenu() {
    setShowMenu((show) => !show);
  }

  return (
    <div className="bg-primary flex flex-col gap-2 rounded-lg">
      <div className="px-3 pt-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <img
              src={postCreator?.picture}
              alt={postCreator?.username}
              className="h-[40px] w-auto rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold">
                {postCreator?.firstName} {postCreator?.lastName}
              </span>
              <div className="text-tertiary flex flex-row items-center gap-1.5 text-xs">
                <span>{formatDistanceToNow(new Date(post.createdAt))}</span>
                <span>
                  <FaGlobeEurope />
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <button
              className="bg-tertiary-hover cursor-pointer rounded-full p-1.5 text-center"
              onClick={handleShowMenu}
              ref={buttonRef}
            >
              <HiDotsHorizontal className="text-xl" />
            </button>
            {showMenu && (
              <PostMenu
                userId={userId}
                postCreatorId={postCreator?._id}
                button={buttonRef}
                close={() => setShowMenu(false)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="px-3">{post.content}</span>
        {post.images?.length !== 0 && <PostImages images={post.images} />}
      </div>
      <div className="text-tertiary flex flex-col gap-1 px-3">
        <div className="separator flex flex-row justify-between border-b pb-1">
          <div>1,8k</div>
          <div className="flex flex-row gap-2 self-end">
            <span className="cursor-pointer hover:underline">242 comments</span>
            <span className="cursor-pointer hover:underline">124 shares</span>
          </div>
        </div>
        <div className="separator text-secondary relative grid grid-cols-3 border-b pb-1">
          {activeLike && <ReactionsModal setActiveLike={setActiveLike} />}
          <button
            className="bg-tertiary-hover flex flex-row items-center justify-center gap-1.5 rounded-md p-0.5 text-xl font-semibold"
            onMouseEnter={() => {
              setTimeout(() => {
                setActiveLike(true);
              }, 200);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setActiveLike(false);
              }, 200);
            }}
          >
            <AiOutlineLike />
            <span className="text-[0.95rem]">Like</span>
          </button>
          <button className="bg-tertiary-hover flex flex-row items-center justify-center gap-1.5 rounded-md p-0.5 text-xl font-semibold">
            <IoChatbubbleOutline className="rotate-[270deg]" />
            <span className="text-[0.95rem]">Comment</span>
          </button>
          <button className="bg-tertiary-hover flex flex-row items-center justify-center gap-1.5 rounded-md p-0.5 text-xl font-semibold">
            <IoArrowRedoOutline />
            <span className="text-[0.95rem]">Share</span>
          </button>
        </div>
        <AddComment />
      </div>
    </div>
  );
}

export default Post;
