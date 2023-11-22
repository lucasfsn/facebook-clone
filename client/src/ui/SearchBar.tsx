import { RefObject } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface SearchBarProps {
  placeholder: string;
  showIcon?: boolean;
  setShowIcon?: (arg: boolean) => void;
  onClick?: () => void;
  full?: boolean;
  input?: RefObject<HTMLInputElement>;
}

function SearchBar({
  placeholder,
  showIcon = true,
  setShowIcon = () => {},
  onClick,
  full = false,
  input,
}: SearchBarProps) {
  return (
    <div
      onClick={onClick}
      className="bg-tertiary flex h-[40px] min-w-[40px] cursor-text items-center justify-start gap-2 rounded-full px-3 py-1"
    >
      {showIcon && <HiMagnifyingGlass className="text-md text-secondary" />}
      <input
        className={`bg-tertiary border-none text-base outline-none lg:block ${
          full ? "" : "hidden"
        }`}
        type="text"
        placeholder={placeholder}
        onFocus={() => setShowIcon(false)}
        onBlur={() => setShowIcon(true)}
        ref={input}
      />
    </div>
  );
}

export default SearchBar;
