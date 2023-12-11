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
import { error, getUserProfile, loading, updateProfile } from "./profileSlice";

export function useFriend() {
  const dispatch = useDispatch();
  const profile = useSelector(getUserProfile);

  async function addFriend(userId: string, friendId: string) {
    dispatch(loading());

    try {
      const { message } = await addFriendApi(userId, friendId);

      dispatch(
        updateProfile({ friendRequests: [...profile.friendRequests, userId] }),
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

      dispatch(
        updateProfile({
          friends: profile.friends.filter((friend) => friend !== userId),
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

      dispatch(
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

      dispatch(updateProfile({ friends: [...profile.friends, userId] }));

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

      dispatch(
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
