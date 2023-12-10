import { RefObject, useState } from "react";
import { HiOutlineBookmark, HiOutlineTrash, HiPencil } from "react-icons/hi2";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { PostRes } from "./postSlice";
import { useDeletePost } from "./useDeletePost";

interface PostMenuProps {
  userId: string | undefined;
  postCreatorId: string | undefined;
  button: RefObject<HTMLButtonElement>;
  close: () => void;
  post: PostRes;
}

function PostMenu({
  userId,
  postCreatorId,
  button,
  close,
  post,
}: PostMenuProps) {
  const [isCreator] = useState<boolean>(userId === postCreatorId);
  const { ref } = useOutsideClick(close, true, button);

  const { deletePost } = useDeletePost();

  return (
    <div
      className="bg-primary text-secondary absolute right-0 z-50 flex w-[325px] flex-col gap-3 rounded-md p-1.5 shadow-3xl"
      ref={ref}
    >
      <div className="separator bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-1 py-1">
        <HiOutlineBookmark className="text-2xl" />
        <div className="flex flex-col">
          <span>Save post</span>
          <span className="text-tertiary text-xs">
            Add this to your saved items.
          </span>
        </div>
      </div>
      {isCreator && (
        <>
          <div className="separator bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-1 py-1.5">
            <HiPencil className="text-2xl" />
            <div className="flex flex-col">
              <span>Edit post</span>
            </div>
          </div>
          <div
            className="separator bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-1 py-1"
            onClick={() => {
              deletePost(post);
              close();
            }}
          >
            <HiOutlineTrash className="text-2xl" />
            <div className="flex flex-col">
              <span>Move to trash</span>
              <span className="text-tertiary text-xs">
                Items in your trash are deleted after 30 days.
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PostMenu;
