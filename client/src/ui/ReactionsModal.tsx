import { Dispatch, SetStateAction, useState } from "react";
import { reactions } from "../../data/reactions";

interface ReactionsModalProps {
  setActiveLike: Dispatch<SetStateAction<boolean>>;
}

function ReactionsModal({ setActiveLike }: ReactionsModalProps) {
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  return (
    <div
      className="bg-secondary absolute -top-full z-50 flex flex-row gap-2 rounded-full p-1 shadow-3xl"
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
      {reactions.map((r) => (
        <div
          key={r.id}
          className="relative cursor-pointer"
          onMouseEnter={() => setActiveReaction(r.name)}
          onMouseLeave={() => setActiveReaction(null)}
        >
          {activeReaction === r.name && (
            <span className="absolute -top-7 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-black px-1.5 text-sm font-semibold text-white brightness-90">
              {r.name}
            </span>
          )}
          <img
            src={r.reaction}
            alt={r.name}
            className="max-h-[40px] min-h-[40px] min-w-[40px] max-w-[40px] rounded-full transition-all hover:-translate-y-1.5 hover:scale-[1.2]"
          />
        </div>
      ))}
    </div>
  );
}

export default ReactionsModal;
