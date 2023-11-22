import { useEffect, useRef, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";
import SearchBar from "./SearchBar";

interface HeaderSearchModalProps {
  setShowSearchPanel: (arg: boolean) => void;
}

function HeaderSearchModal({ setShowSearchPanel }: HeaderSearchModalProps) {
  const [showIcon, setShowIcon] = useState(true);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const close = () => {
    setShowSearchPanel(false);
  };

  const { ref } = useOutsideClick(close);

  return (
    <div
      ref={ref}
      className="bg-primary absolute left-0 top-0 z-50 flex w-[310px] flex-col justify-center gap-2 rounded-b-lg p-2 shadow-md"
    >
      <div className="flex flex-row gap-2">
        <button
          className="bg-tertiary-hover flex h-[40px] min-w-[40px] items-center justify-center rounded-full"
          onClick={close}
        >
          <HiArrowLeft className="text-secondary text-xl" />
        </button>
        <SearchBar
          placeholder="Search Facebook"
          showIcon={showIcon}
          setShowIcon={setShowIcon}
          full={true}
          input={input}
        />
      </div>
      <div className="self-center py-2 text-gray-500">No recent searches</div>
    </div>
  );
}

export default HeaderSearchModal;
