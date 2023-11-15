import { useEffect, useRef, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";
import HeaderSearchInput from "./HeaderSearchInput";

interface Props {
  setShowSearchPanel: (arg: boolean) => void;
}

function HeaderSearch({ setShowSearchPanel }: Props) {
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
      className="absolute left-0 top-0 z-50 flex w-[310px] flex-col justify-center gap-2 rounded-b-lg bg-white p-2 shadow-md"
    >
      <div className="flex flex-row gap-2">
        <button
          className="flex h-[40px] min-w-[40px] items-center justify-center rounded-full hover:bg-gray-100"
          onClick={close}
        >
          <HiArrowLeft className="text-xl" />
        </button>
        <HeaderSearchInput
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

export default HeaderSearch;
