import { useMemo, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { getUserProfile } from "../profile/profileSlice";
import SearchBar from "../search/SearchBar";
import { getSearch } from "../search/searchSlice";
import { useSearchResults } from "../search/useSearchResults";

function HomeContacts() {
  const profile = useSelector(getUserProfile);

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { setResults } = useSearchResults();
  const search = useSelector(getSearch);

  const { ref } = useOutsideClick(() => {
    setResults([]);
    setShowSearch(false);
  });

  const memoizedSearchResults = useMemo(() => search.results, [search.results]);

  return (
    <div className="text-secondary sticky top-[55px] hidden max-h-[calc(100dvh_-90px)] w-[300px] flex-col pr-3 pt-3 md:block">
      <div className="flex flex-col justify-center">
        <div className="separator flex max-h-[70dvh] flex-col overflow-y-scroll border-b pb-2">
          <div
            className="flex flex-row items-center justify-between gap-3"
            ref={ref}
          >
            <span className="ml-2 font-semibold">Contacts</span>
            {!showSearch ? (
              <div
                className="bg-tertiary-hover flex h-[35px] w-[35px] min-w-[35px] cursor-pointer items-center justify-center rounded-full"
                onClick={() => setShowSearch(true)}
              >
                <HiMagnifyingGlass />
              </div>
            ) : (
              <SearchBar
                placeholder="Search Friends"
                full={true}
                filterFriends={true}
              />
            )}
          </div>
          {(memoizedSearchResults.length > 0
            ? search.results
            : profile.friends
          ).map((friend) => (
            <Link
              to={`/profile/${friend.username}`}
              key={friend._id}
              className="bg-tertiary-hover flex cursor-pointer items-center gap-2.5 rounded-lg p-2"
            >
              <img
                src={friend.picture}
                className="aspect-square w-[35px] rounded-full"
              />
              <div className="flex gap-1.5">
                <span>{friend.firstName}</span>
                <span>{friend.lastName}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 py-2">
          <span className="ml-2 font-semibold">Group conversations</span>
          <div className="bg-tertiary-hover flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2">
            <div className="bg-tertiary flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full text-xl">
              <FiPlus />
            </div>
            <span className="text-base">Create new group</span>
          </div>
        </div>
      </div>
      <div className="bg-tertiary bg-tertiary-hover text-secondary fixed bottom-5 right-5 flex h-[45px] w-[45px] min-w-[45px] cursor-pointer items-center justify-center self-end rounded-full text-xl shadow-lg">
        <FaPenToSquare />
      </div>
    </div>
  );
}

export default HomeContacts;
