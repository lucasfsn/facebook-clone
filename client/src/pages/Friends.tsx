import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProfile } from "../features/profile/profileSlice";

function Friends() {
  const profile = useSelector(getUserProfile);

  return (
    <div className="text-secondary flex w-full flex-col justify-between gap-4 p-4 xl:mx-auto xl:w-4/6">
      <div className="bg-primary flex flex-col gap-4 rounded-md p-4">
        <div className="text-xl font-bold">Friends</div>
        <div className="grid grid-cols-2 gap-2">
          {profile.friends.map((friend) => (
            <div
              className="separator flex items-center gap-1 rounded-md border p-4"
              key={friend._id}
            >
              <Link
                to={`/profile/${friend.username}`}
                className="flex w-full items-center justify-between rounded-md"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={friend.picture}
                    alt={friend.firstName}
                    className="aspect-square h-[80px] rounded-md"
                  />
                  <span className="text-secondary text-lg font-semibold">
                    {friend.firstName} {friend.lastName}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Friends;
