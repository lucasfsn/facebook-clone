import { Outlet } from "react-router-dom";
import FriendsMenu from "../features/friends/FriendsMenu";

function FriendsLayout() {
  return (
    <div className="text-secondary separator bg-secondary flex w-full border-t">
      <FriendsMenu />
      <Outlet />
    </div>
  );
}

export default FriendsLayout;
