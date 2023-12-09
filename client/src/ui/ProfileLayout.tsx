import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import {
  fetchImages,
  getLoading as getLoadingImages,
} from "../features/image/imagesSlice";
import ProfileHeader from "../features/profile/ProfileHeader";
import {
  getError,
  getLoading as getLoadingProfile,
  getProfile,
  getUserProfile,
} from "../features/profile/profileSlice";
import { getUser } from "../features/user/userSlice";
import { AppDispatch } from "../store";
import Spinner from "./Spinner";

function ProfileLayout() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { username: paramsUsername } = useParams();

  const profile = useSelector(getUserProfile);
  const user = useSelector(getUser);

  const isLoadingImages = useSelector(getLoadingImages);

  const isLoadingProfile = useSelector(getLoadingProfile);
  const error = useSelector(getError);

  const userProfileName = paramsUsername || user?.username;

  useEffect(() => {
    dispatch(getProfile(userProfileName as string));

    if (error) navigate("/profile");
  }, [dispatch, userProfileName, error, navigate]);

  useEffect(() => {
    dispatch(
      fetchImages({
        paths: [
          `${profile?.username}/posts/images`,
          `${profile?.username}/profile/profilePicture`,
          `${profile?.username}/profile/profileCover`,
        ],
        sort: "desc",
      }),
    );
  }, [dispatch, profile]);

  if (isLoadingProfile || isLoadingImages) return <Spinner />;

  return (
    <div className="w-full">
      <ProfileHeader />
      <Outlet />
    </div>
  );
}

export default ProfileLayout;