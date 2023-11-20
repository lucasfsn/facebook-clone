import { RefObject } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface Props {
  placeholder: string;
  showIcon?: boolean;
  setShowIcon?: (arg: boolean) => void;
  onClick?: () => void;
  full?: boolean;
  input?: RefObject<HTMLInputElement>;
}

function HeaderSearchInput({
  placeholder,
  showIcon = true,
  setShowIcon = () => {},
  onClick,
  full = false,
  input,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="icon-bg flex h-[40px] min-w-[40px] cursor-text items-center justify-start gap-2 rounded-full px-3 py-1"
    >
      {showIcon && <HiMagnifyingGlass className="text-md icon-text" />}
      <input
        className={`icon-bg border-none text-base outline-none lg:block ${
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

export default HeaderSearchInput;
