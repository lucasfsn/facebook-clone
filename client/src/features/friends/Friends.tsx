import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile } from "../../services/apiProfile";
import Spinner from "../../ui/Spinner";
import { ProfileRes } from "../profile/profileSlice";
import { useFriend } from "../profile/useFriend";
import { getUser } from "../user/userSlice";

function Friends() {
  const [currentUser, setCurrentUser] = useState<ProfileRes | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const user = useSelector(getUser);

  const { removeFriend } = useFriend();

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const data = await getProfile(user.username);
        setCurrentUser(data);
      }
    }

    fetchData();
  }, [user, refreshKey]);

  if (!currentUser) return <Spinner />;

  return (
    <div className="text-secondary grid w-2/3 grid-cols-3 gap-2 p-6 font-semibold lg:grid-cols-4 xl:grid-cols-5">
      {currentUser.friends.map((friend) => (
        <div
          key={friend._id}
          className="bg-primary h-fit overflow-hidden rounded-md"
        >
          <Link to={`/profile/${friend.username}`}>
            <img
              src={friend.picture}
              alt={friend.firstName}
              className="aspect-square w-full"
            />
          </Link>
          <div className="flex flex-col gap-2 p-2">
            <Link
              to={`/profile/${friend.username}`}
              className="w-fit hover:underline"
            >
              {friend.firstName} {friend.lastName}
            </Link>
            <div
              className="bg-tertiary bg-tertiary-hover cursor-pointer rounded-md p-1.5 text-center"
              onClick={async (e) => {
                e.stopPropagation();
                await removeFriend(currentUser._id, friend._id);
                setRefreshKey((key) => key + 1);
              }}
            >
              Remove
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Friends;
