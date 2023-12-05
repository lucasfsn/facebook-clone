import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaGlobeEurope } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoArrowRedoOutline, IoChatbubbleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Modal from "../../ui/Modal";
import ReactionsModal from "../../ui/ReactionsModal";
import { getUser } from "../user/userSlice";
import AddComment from "./AddComment";
import PostImages from "./PostImages";
import PostMenu from "./PostMenu";
import { PostRes } from "./postSlice";

interface PostProps {
  post: PostRes;
}

function Post({ post }: PostProps) {
  const user = useSelector(getUser);
  const [activeLike, setActiveLike] = useState<boolean>(false);

  return (
    <div className="bg-primary flex flex-col gap-2 rounded-lg">
      <div className="px-3 pt-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <img
              src={post.user.picture}
              alt={post.user.username}
              className="h-[40px] w-auto rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold">
                {post.user.firstName} {post.user.lastName}
              </span>
              <div className="text-tertiary flex flex-row items-center gap-1.5 text-xs">
                <span>{formatDistanceToNow(new Date(post.createdAt))}</span>
                <span>
                  <FaGlobeEurope />
                </span>
              </div>
            </div>
          </div>
          <Modal>
            <Modal.Open opens="post">
              <button className="bg-tertiary-hover cursor-pointer rounded-full p-1.5 text-center">
                <HiDotsHorizontal className="text-xl" />
              </button>
            </Modal.Open>
            <Modal.Window name="post" type="center" width="310px">
              <PostMenu userId={user?.id} postCreatorId={post.user._id} />
            </Modal.Window>
          </Modal>
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
