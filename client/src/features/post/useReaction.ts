import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  addReaction as addReactionApi,
  getReactions as getReactionsApi,
} from "../../services/apiPosts";
import { AppDispatch } from "../../store";
import { ReactionType } from "../../types/posts";
import { ResponseError, handleError } from "../../utils/helpers";
import { error } from "./postSlice";

export function useReaction() {
  const dispatch: AppDispatch = useDispatch();

  async function addReaction(
    reaction: ReactionType,
    postId: string,
    userId: string,
  ) {
    try {
      await addReactionApi(reaction, postId, userId);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  const getReactions = useCallback(
    async (postId: string, userId: string) => {
      try {
        const res = await getReactionsApi(postId, userId);
        return res;
      } catch (err) {
        handleError(err as ResponseError);
        dispatch(error());
      }
    },
    [dispatch],
  );

  return { addReaction, getReactions };
}
