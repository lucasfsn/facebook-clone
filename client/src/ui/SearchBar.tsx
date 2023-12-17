import { RefObject, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { getUserProfile } from "../features/profile/profileSlice";
import { search } from "../services/apiSearch";
import { SearchUser } from "../types/search";

interface SearchBarProps {
  placeholder: string;
  showIcon?: boolean;
  setShowIcon?: (arg: boolean) => void;
  onClick?: () => void;
  full?: boolean;
  input?: RefObject<HTMLInputElement>;
  setSearchResults?: (value: SearchUser[]) => void;
  filterFriends?: boolean;
}

function SearchBar({
  placeholder,
  showIcon = true,
  setShowIcon = () => {},
  onClick,
  full = false,
  input,
  setSearchResults,
  filterFriends = false,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const profile = useSelector(getUserProfile);

  async function handleSearch() {
    if (!setSearchResults) return;

    if (!searchValue || searchValue.length <= 2) {
      setSearchResults([]);
      return;
    }

    const { data } = await search(searchValue);

    const filteredFriends = data.filter((res: SearchUser) =>
      profile.friends.find((friend) => friend._id === res._id),
    );

    if (filterFriends) setSearchResults(filteredFriends);
    else setSearchResults(data);
  }

  return (
    <div
      onClick={onClick}
      className={`bg-tertiary flex h-[40px] min-w-[40px] cursor-text items-center justify-start gap-2 overflow-hidden rounded-full px-3 py-1 ${
        showIcon ? "cursor-default" : ""
      }`}
    >
      {showIcon && <HiMagnifyingGlass className="text-md text-secondary" />}
      <input
        className={`bg-tertiary text-secondary border-none text-base outline-none lg:block ${
          full ? "" : "hidden"
        }`}
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={handleSearch}
        onFocus={() => setShowIcon(false)}
        onBlur={() => setShowIcon(true)}
        ref={input}
      />
    </div>
  );
}

export default SearchBar;
