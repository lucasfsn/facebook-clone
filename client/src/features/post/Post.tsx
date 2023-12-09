import { formatDistanceToNow } from "date-fns";
import { useRef, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaGlobeEurope } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoArrowRedoOutline, IoChatbubbleOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ReactionsModal from "../../ui/ReactionsModal";
import ImagesPost from "../image/ImagesPost";
import { getUserId } from "../user/userSlice";
import AddComment from "./AddComment";
import PostMenu from "./PostMenu";
import { PostRes } from "./postSlice";

interface PostProps {
  post: PostRes;
}

function Post({ post }: PostProps) {
  const [activeLike, setActiveLike] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const userId = useSelector(getUserId);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const nodeRef = useRef(null);

  function handleShowMenu() {
    setShowMenu((show) => !show);
  }

  return (
    <div className="bg-primary flex flex-col gap-2 rounded-lg">
      <div className="px-3 pt-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Link to={`/profile/${post.user.username}`}>
              <img
                src={post.user.picture}
                alt={post.user.username}
                className="h-[40px] w-auto rounded-full"
              />
            </Link>
            <div className="flex flex-col">
              {(() => {
                switch (post.type) {
                  case "post":
                    return (
                      <span className="text-lg font-semibold">
                        {post.user.firstName} {post.user.lastName}
                      </span>
                    );
                  case "cover":
                  case "profile":
                    return (
                      <div className="flex flex-row items-center gap-1.5">
                        <span className="font-semibold">
                          {post.user.firstName} {post.user.lastName}
                        </span>
                        <span className="text-tertiary">
                          updated{" "}
                          {post.type === "cover"
                            ? "cover photo"
                            : "profile picture"}
                          .
                        </span>
                      </div>
                    );
                  case "details":
                    return (
                      <div className="flex flex-row items-center gap-1.5">
                        <span className="font-semibold">
                          {post.user.firstName} {post.user.lastName}
                        </span>
                        <span className="text-tertiary">
                          updated {post.key}
                        </span>
                      </div>
                    );
                  default:
                    return null;
                }
              })()}
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
                postCreatorId={post.user._id}
                button={buttonRef}
                close={() => setShowMenu(false)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {post.type === "details" ? (
          <div className="text-secondary flex h-20 flex-col items-center justify-center gap-2">
            <div className="bg-tertiary rounded-full p-2">
              <TbListDetails className="text-2xl" />
            </div>
            <span className="text-xl">{post.content}</span>
          </div>
        ) : (
          <span className="px-3">{post.content}</span>
        )}
        {post.images?.length !== 0 && (
          <ImagesPost images={post.images} type={post.type} />
        )}
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
          <CSSTransition
            nodeRef={nodeRef}
            in={activeLike}
            timeout={400}
            classNames="slide-up"
            unmountOnExit
          >
            <ReactionsModal ref={nodeRef} setActiveLike={setActiveLike} />
          </CSSTransition>
          <button
            className="bg-tertiary-hover flex flex-row items-center justify-center gap-1.5 rounded-md p-0.5 text-xl font-semibold"
            onMouseEnter={() => {
              setTimeout(() => {
                setActiveLike(true);
              }, 400);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setActiveLike(false);
              }, 400);
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
