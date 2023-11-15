import { RefObject } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface Props {
  showIcon?: boolean;
  setShowIcon?: (arg: boolean) => void;
  onClick?: () => void;
  full?: boolean;
  input?: RefObject<HTMLInputElement>;
}

function HeaderSearchInput({
  showIcon = true,
  setShowIcon = () => {},
  onClick,
  full = true,
  input,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="flex h-[40px] min-w-[40px] cursor-text items-center justify-center gap-2 rounded-full bg-gray-100 px-3 py-1"
    >
      {showIcon && <HiMagnifyingGlass className="text-md" />}
      <input
        className={`border-none bg-gray-100 text-base outline-none lg:block ${
          full ? "" : "hidden"
        }`}
        type="text"
        placeholder="Search Facebook"
        onFocus={() => setShowIcon(false)}
        onBlur={() => setShowIcon(true)}
        ref={input}
      />
    </div>
  );
}

export default HeaderSearchInput;
