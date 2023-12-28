import { useCallback } from "react";
import {
  addReaction as addReactionApi,
  getReactions as getReactionsApi,
} from "../../services/apiPosts";
import { ReactionType } from "../../types/posts";
import { ResponseError, handleError } from "../../utils/helpers";

export function useReaction() {
  async function addReaction(
    reaction: ReactionType,
    postId: string,
    userId: string,
  ) {
    try {
      await addReactionApi(reaction, postId, userId);
    } catch (err) {
      handleError(err as ResponseError);
    }
  }

  const getReactions = useCallback(async (postId: string, userId: string) => {
    try {
      const res = await getReactionsApi(postId, userId);
      return res;
    } catch (err) {
      handleError(err as ResponseError);
    }
  }, []);

  return { addReaction, getReactions };
}
