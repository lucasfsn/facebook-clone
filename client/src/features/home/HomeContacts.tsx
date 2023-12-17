import { useEffect, useMemo, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { AppDispatch } from "../../store";
import { SearchUser } from "../../types/search";
import SearchBar from "../../ui/SearchBar";
import { getProfile, getUserProfile } from "../profile/profileSlice";
import { getUser } from "../user/userSlice";

function HomeContacts() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(getUser);
  const profile = useSelector(getUserProfile);

  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const { ref } = useOutsideClick(() => {
    setSearchResults([]);
    setShowSearch(false);
  });
  const memoizedSearchResults = useMemo(() => searchResults, [searchResults]);

  useEffect(() => {
    if (user) dispatch(getProfile(user?.username));
  }, [dispatch, user]);

  return (
    <div className="text-secondary sticky top-[55px] hidden max-h-[calc(100dvh_-90px)] min-w-[275px] flex-col pr-3 pt-3 md:block">
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
                setSearchResults={setSearchResults}
                full={true}
                filterFriends={true}
              />
            )}
          </div>
          {(memoizedSearchResults.length > 0
            ? searchResults
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
