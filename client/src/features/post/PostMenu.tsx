import { useState } from "react";
import { HiOutlineBookmark, HiOutlineTrash, HiPencil } from "react-icons/hi2";

interface PostMenuProps {
  userId: string | undefined;
  postCreatorId: string | undefined;
}

function PostMenu({ userId, postCreatorId }: PostMenuProps) {
  const [isCreator] = useState<boolean>(userId === postCreatorId);

  return (
    <div className="bg-primary text-secondary flex flex-col gap-3 rounded-md p-3">
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
          <div className="separator bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-1 py-1">
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
