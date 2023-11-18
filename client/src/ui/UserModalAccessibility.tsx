import { ChangeEvent, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { DarkModeOptions, useDarkMode } from "../context/DarkModeContext";

interface Props {
  handleGoBack: () => void;
}

function UserModalAccessibility({ handleGoBack }: Props) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [selectedMode, setSelectedMode] = useState(darkMode);

  console.log(selectedMode, darkMode);

  const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value as DarkModeOptions;

    setSelectedMode(selected);
    toggleDarkMode(selected);
  };

  return (
    <div className="absolute right-[10px] top-[50px] z-50 flex max-h-[90vh] max-w-[350px] flex-col gap-3 rounded-lg bg-white p-3 shadow-md">
      <div className="flex items-center gap-2">
        <div
          className="cursor-pointer rounded-full p-2 text-xl hover:bg-gray-100"
          onClick={handleGoBack}
        >
          <FaArrowLeft />
        </div>
        <p className="px-2 text-2xl font-bold">Display & accessibility</p>
      </div>
      <div className="flex justify-start gap-2">
        <div className="h-fit rounded-full bg-gray-200 p-2 text-xl">
          <IoMdMoon />
        </div>
        <div className="flex flex-col gap-2 text-base">
          <div className="flex flex-col px-2">
            <span className="text-xl font-semibold">Dark mode</span>
            <span className="text-sm text-gray-500">
              Adjust the appearance of Facebook to reduce glare and give your
              eyes a break.
            </span>
          </div>
          <label className="flex cursor-pointer justify-between rounded-lg p-2 text-base hover:bg-gray-100">
            <span>Off</span>
            <input
              type="radio"
              name="darkmode"
              id="darkmode-off"
              value="off"
              className="scale-150"
              checked={selectedMode === "off"}
              onChange={onOptionChange}
            />
          </label>
          <label className="flex cursor-pointer justify-between rounded-lg p-2 text-base hover:bg-gray-100">
            <span>On</span>
            <input
              type="radio"
              name="darkmode"
              id="darkmode-on"
              value="on"
              className="scale-150"
              checked={selectedMode === "on"}
              onChange={onOptionChange}
            />
          </label>
          <label className="flex cursor-pointer justify-between rounded-lg p-2 text-base hover:bg-gray-100">
            <div className="flex flex-col">
              <span>Automatic</span>
              <span className="pr-2 text-xs text-gray-500">
                We'll automatically adjust the display based on your device's
                system settings.
              </span>
            </div>
            <input
              type="radio"
              name="darkmode"
              id="darkmode-auto"
              value="auto"
              className="scale-150"
              checked={selectedMode === "auto"}
              onChange={onOptionChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default UserModalAccessibility;
