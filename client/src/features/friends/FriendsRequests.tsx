import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserById } from "../../services/apiFriend";
import { Friend } from "../../types/profile";
import ProfileFriend from "../profile/ProfileFriend";
import { getUser } from "../user/userSlice";

function FriendsRequests() {
  const user = useSelector(getUser);
  const [requests, setRequests] = useState<Friend[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = useCallback(
    async function () {
      if (user) {
        const data = await getUserById(user.id);

        const usersData = await Promise.all(
          data.friendRequests.map(getUserById),
        );
        setRequests(usersData);
      }
    },
    [user],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, user, refreshKey]);

  return (
    <div className="flex w-2/3 flex-col gap-2 p-4">
      {requests.map((friend) => (
        <ProfileFriend
          friend={friend}
          key={friend._id}
          onFriendRequestChange={() => setRefreshKey((key) => key + 1)}
        />
      ))}
    </div>
  );
}

export default FriendsRequests;
