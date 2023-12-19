import { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import { reactions } from "../../../data/reactions";
import { ReactionType } from "../../types/posts";
import { capitalize } from "../../utils/helpers";
import { getUserId } from "../user/userSlice";
import { useReaction } from "./useReaction";

interface ReactionsModalProps {
  postId: string;
  setActiveLike: (active: boolean) => void;
  setReaction: (reaction: ReactionType | "") => void;
  currentReaction: string | undefined;
}

const ReactionsModal = forwardRef<HTMLDivElement, ReactionsModalProps>(
  ({ postId, setActiveLike, setReaction, currentReaction }, ref) => {
    const [activeReaction, setActiveReaction] = useState<string | null>(null);

    const { addReaction } = useReaction();

    const userId = useSelector(getUserId);

    async function handleAddReaction(reaction: ReactionType) {
      if (userId) await addReaction(reaction, postId, userId);
      currentReaction === reaction && currentReaction
        ? setReaction("")
        : setReaction(reaction);
    }

    return (
      <div
        ref={ref}
        className="bg-secondary absolute -top-[130%] z-50 flex flex-row gap-2 rounded-full p-1 shadow-3xl"
        onMouseEnter={() => {
          setTimeout(() => {
            setActiveLike(true);
          }, 500);
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setActiveLike(false);
          }, 500);
        }}
      >
        {reactions.map((r) => (
          <div
            key={r.id}
            className="relative cursor-pointer"
            onMouseEnter={() => setActiveReaction(r.name)}
            onMouseLeave={() => setActiveReaction(null)}
          >
            {activeReaction === r.name && (
              <span className="absolute -top-8 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-black bg-opacity-70 px-1.5 text-sm font-semibold text-white">
                {capitalize(r.name)}
              </span>
            )}
            <img
              src={r.reaction}
              alt={r.name}
              className="max-h-[40px] min-h-[40px] min-w-[40px] max-w-[40px] rounded-full transition-all hover:-translate-y-1.5 hover:scale-[1.2]"
              onClick={() => handleAddReaction(r.name as ReactionType)}
            />
          </div>
        ))}
      </div>
    );
  },
);

export default ReactionsModal;
