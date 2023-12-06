import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import Spinner from "../../ui/Spinner";
import { getUser } from "../user/userSlice";
import ProfileHeader from "./ProfileHeader";
import ProfileMain from "./ProfileMain";
import { error, getError, getLoading, getProfile } from "./profileSlice";

function UserProfile() {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const isError = useSelector(getError);
  const dispatch: AppDispatch = useDispatch();
  const { username } = useParams();

  const userProfileName = username === undefined ? user?.username : username;

  useEffect(() => {
    dispatch(getProfile(userProfileName as string));
  }, [dispatch, userProfileName]);

  useEffect(() => {
    if (isError) {
      dispatch(error(false));
      navigate("/");
    }
  }, [navigate, dispatch, isError]);

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full">
      <ProfileHeader />
      <ProfileMain />
    </div>
  );
}

export default UserProfile;
