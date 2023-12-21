import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFriendRequest as acceptFriendRequestApi,
  addFriend as addFriendApi,
  cancelFriendRequest as cancelFriendRequestApi,
  removeFriend as removeFriendApi,
  removeFriendRequest as removeFriendRequestApi,
} from "../../services/apiFriend";
import { ResponseError, handleError } from "../../utils/helpers";
import { getUser } from "../user/userSlice";
import {
  error,
  getUserProfile,
  loading,
  updateProfile,
  updated,
} from "./profileSlice";

export function useFriend(isProfileFriendsPage: boolean = false) {
  const dispatch = useDispatch();
  const profile = useSelector(getUserProfile);
  const user = useSelector(getUser);

  async function addFriend(userId: string, friendId: string) {
    dispatch(loading());

    try {
      const { message } = await addFriendApi(userId, friendId);

      isProfileFriendsPage
        ? dispatch(updated())
        : dispatch(
            updateProfile({
              friendRequests: [...profile.friendRequests, userId],
            }),
          );

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function removeFriend(userId: string, friendId: string) {
    dispatch(loading());

    try {
      const { message } = await removeFriendApi(userId, friendId);

      isProfileFriendsPage
        ? dispatch(updated())
        : dispatch(
            updateProfile({
              friends: profile.friends.filter(
                (friend) => friend._id !== friendId,
              ),
            }),
          );

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function denyFriendRequest(userId: string, friendId: string) {
    dispatch(loading());

    try {
      const { message } = await removeFriendRequestApi(userId, friendId);

      isProfileFriendsPage
        ? dispatch(updated())
        : dispatch(
            updateProfile({
              friendRequests: profile.friendRequests.filter(
                (friend) => friend !== userId,
              ),
            }),
          );

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function acceptFriendRequest(userId: string, friendId: string) {
    dispatch(loading());

    try {
      const { message } = await acceptFriendRequestApi(userId, friendId);

      if (!isProfileFriendsPage && user) {
        dispatch(
          updateProfile({
            friends: [
              ...profile.friends,
              {
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                picture: user.picture,
                username: user.username,
              },
            ],
          }),
        );
      } else {
        dispatch(updated());
      }

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function cancelFriendRequest(userId: string, friendId: string) {
    dispatch(loading());

    try {
      const { message } = await cancelFriendRequestApi(userId, friendId);

      isProfileFriendsPage
        ? dispatch(updated())
        : dispatch(
            updateProfile({
              friendRequests: profile.friendRequests.filter(
                (friend) => friend !== userId,
              ),
            }),
          );

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return {
    addFriend,
    removeFriend,
    denyFriendRequest,
    acceptFriendRequest,
    cancelFriendRequest,
  };
}
