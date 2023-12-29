import { useCallback, useReducer } from "react";
import {
  addReaction as addReactionApi,
  getReactions as getReactionsApi,
} from "../../services/apiPosts";
import { ReactionType, SingleReaction } from "../../types/posts";
import { ResponseError, handleError } from "../../utils/helpers";

interface ReactionState {
  reactions: SingleReaction[];
  reaction: ReactionType | "";
  reactionsCount: number;
}

const initialState: ReactionState = {
  reactions: [],
  reaction: "",
  reactionsCount: 0,
};

type Action =
  | {
      type: "SET_REACTIONS";
      payload: {
        reactions: SingleReaction[];
        reactionsCount: number;
        reaction: ReactionType | "";
      };
    }
  | { type: "SET_REACTION"; payload: ReactionType | "" };

function reducer(state: ReactionState, action: Action): ReactionState {
  switch (action.type) {
    case "SET_REACTIONS":
      return { ...state, ...action.payload };
    case "SET_REACTION":
      return { ...state, reaction: action.payload };
    default:
      return state;
  }
}

export function useReaction() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function addReaction(
    reaction: ReactionType,
    postId: string,
    userId: string,
  ) {
    try {
      await addReactionApi(reaction, postId, userId);
      dispatch({ type: "SET_REACTION", payload: reaction });
    } catch (err) {
      handleError(err as ResponseError);
    }
  }

  const getReactions = useCallback(async (postId: string, userId: string) => {
    try {
      const res = await getReactionsApi(postId, userId);
      dispatch({
        type: "SET_REACTIONS",
        payload: {
          reactions: res?.reactions,
          reactionsCount: res?.reactionsCount,
          reaction: res?.userReaction,
        },
      });
    } catch (err) {
      handleError(err as ResponseError);
    }
  }, []);

  function setReaction(reaction: ReactionType | "") {
    dispatch({ type: "SET_REACTION", payload: reaction });
  }

  return { reactions: state, addReaction, getReactions, setReaction };
}
