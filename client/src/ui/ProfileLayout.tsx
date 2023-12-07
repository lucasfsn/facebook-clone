import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import {
  fetchImages,
  getLoading as getLoadingImages,
} from "../features/image/imagesSlice";
import ProfileHeader from "../features/profile/ProfileHeader";
import {
  getLoading as getLoadingProfile,
  getProfile,
  getUserProfile,
} from "../features/profile/profileSlice";
import { getUser } from "../features/user/userSlice";
import { AppDispatch } from "../store";
import Spinner from "./Spinner";

function ProfileLayout() {
  const user = useSelector(getUser);
  const isLoadingProfile = useSelector(getLoadingProfile);
  const isLoadingImages = useSelector(getLoadingImages);
  const profile = useSelector(getUserProfile);

  const dispatch: AppDispatch = useDispatch();
  const { username } = useParams();

  const userProfileName = username === undefined ? user?.username : username;

  useEffect(() => {
    dispatch(getProfile(userProfileName as string));
  }, [dispatch, userProfileName]);

  useEffect(() => {
    dispatch(
      fetchImages({
        path: `${profile.username}/posts/images`,
        sort: "desc",
      }),
    );
  }, [dispatch, profile.username]);

  if (isLoadingProfile || isLoadingImages) return <Spinner />;

  return (
    <div className="w-full">
      <ProfileHeader />
      <Outlet />
    </div>
  );
}

export default ProfileLayout;
