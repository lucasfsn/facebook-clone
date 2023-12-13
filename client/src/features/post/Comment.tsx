import { formatDistanceToNow } from "date-fns";
import { SingleComment } from "../../types/posts";

interface CommentProps {
  comment: SingleComment;
}

function Comment({ comment }: CommentProps) {
  return (
    <div className="flex gap-2">
      <img
        src={comment.author.picture}
        alt={comment.author.firstName}
        className="aspect-square h-[35px] rounded-full"
      />
      <div className="flex flex-col gap-1.5">
        <div className="bg-tertiary flex w-fit flex-col rounded-[1.25rem] px-3 py-2">
          <div className="text-secondary">
            {comment.author.firstName} {comment.author.lastName}
          </div>
          <div className="text-comment text-[0.95rem]">{comment.comment}</div>
        </div>
        {comment.image && (
          <img
            src={comment.image}
            alt="comment"
            className="-mt-2 w-[100px] rounded-[1.25rem]"
          />
        )}
        <span className="pl-3 text-xs">
          {formatDistanceToNow(new Date(comment.commentDate))}
        </span>
      </div>
    </div>
  );
}

export default Comment;
