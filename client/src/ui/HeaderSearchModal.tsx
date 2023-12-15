import { useEffect, useReducer, useRef, useState } from "react";
import { HiArrowLeft, HiXMark } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserId } from "../features/user/userSlice";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { searchAdd, searchGet, serachDelete } from "../services/apiSearch";
import { SearchGet, SearchUser } from "../types/search";
import { ResponseError, handleError } from "../utils/helpers";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

interface SearchState {
  isLoading: boolean;
  search: {
    results: SearchUser[];
    history: SearchGet[];
  };
}

type SearchAction =
  | { type: "search/fetching" }
  | {
      type: "search/arrived";
      payload: SearchGet[];
    }
  | { type: "search/error" }
  | { type: "search/addToHistory"; payload: SearchGet[] }
  | { type: "search/deleteFromHistory"; payload: SearchGet[] }
  | { type: "search/setResults"; payload: SearchUser[] };

const initialState = {
  isLoading: false,
  search: {
    results: [],
    history: [],
  },
};

function reducer(state: SearchState, action: SearchAction) {
  switch (action.type) {
    case "search/fetching":
      return {
        ...state,
        isLoading: true,
      };
    case "search/arrived":
      return {
        ...state,
        isLoading: false,
        search: {
          ...state.search,
          history: action.payload,
        },
      };
    case "search/error":
      return {
        ...state,
        isLoading: false,
      };
    case "search/addToHistory":
      return {
        ...state,
        isLoading: false,
        search: {
          ...state.search,
          history: action.payload,
        },
      };
    case "search/deleteFromHistory":
      return {
        ...state,
        isLoading: false,
        search: {
          ...state.search,
          history: action.payload,
        },
      };
    case "search/setResults":
      return {
        ...state,
        search: {
          ...state.search,
          results: action.payload,
        },
      };
    default:
      throw new Error("Invalid action type");
  }
}

interface HeaderSearchModalProps {
  setShowSearchPanel: (arg: boolean) => void;
}

function HeaderSearchModal({ setShowSearchPanel }: HeaderSearchModalProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [showIcon, setShowIcon] = useState(true);

  const id = useSelector(getUserId);

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  useEffect(() => {
    async function getSearchHistory() {
      if (!id) return;
      try {
        dispatch({ type: "search/fetching" });
        const { data } = await searchGet(id);
        dispatch({
          type: "search/arrived",
          payload: data,
        });
      } catch (err) {
        handleError(err as ResponseError);
        dispatch({ type: "search/error" });
      }
    }

    getSearchHistory();
  }, [id]);

  async function handleAddToSearchHistory(user: string) {
    if (!id) return;
    try {
      const { data } = await searchAdd(user, id);
      dispatch({ type: "search/addToHistory", payload: data });
    } catch (err) {
      handleError(err as ResponseError);
    }
  }

  async function handleDeleteFromSearchHistory(user: string) {
    if (!id) return;
    try {
      const { data } = await serachDelete(user, id);
      dispatch({ type: "search/deleteFromHistory", payload: data });
    } catch (err) {
      handleError(err as ResponseError);
    }
  }

  function setSearchResults(results: SearchUser[]) {
    dispatch({ type: "search/setResults", payload: results });
  }

  const close = () => {
    setShowSearchPanel(false);
  };

  const { ref } = useOutsideClick(close);

  return (
    <div
      ref={ref}
      className="bg-primary absolute left-0 top-0 z-50 flex w-[310px] flex-col justify-center gap-2 rounded-b-lg p-2 shadow-md"
    >
      <div className="flex flex-row gap-2">
        <button
          className="bg-tertiary-hover flex h-[40px] min-w-[40px] items-center justify-center rounded-full"
          onClick={close}
        >
          <HiArrowLeft className="text-secondary text-xl" />
        </button>
        <SearchBar
          placeholder="Search Facebook"
          showIcon={showIcon}
          setShowIcon={setShowIcon}
          full={true}
          input={input}
          setSearchResults={setSearchResults}
        />
      </div>
      {state.search.history.length === 0 &&
        state.search.results.length === 0 && (
          <div className="self-center py-2 text-gray-500">
            No recent searches
          </div>
        )}
      {state.search.results.length === 0 &&
        state.search.history.length !== 0 && (
          <div className="flex max-h-[50dvh] flex-col gap-1 overflow-y-scroll">
            {state.isLoading ? (
              <Loading />
            ) : (
              <span className="text-secondary px-2 py-1 text-lg font-semibold">
                Recent searches
              </span>
            )}
            <div className="flex flex-col">
              {state.search.history.map((result) => (
                <div
                  className="bg-tertiary-hover flex items-center rounded-md p-2"
                  key={result.user._id}
                >
                  <Link
                    to={`/profile/${result.user.username}`}
                    className="flex flex-grow items-center justify-between"
                    onClick={() => handleAddToSearchHistory(result.user._id)}
                  >
                    <div className="text-secondary flex items-center gap-3">
                      <img
                        src={result.user.picture}
                        alt={result.user.username}
                        className="aspect-square w-[35px] rounded-full"
                      />
                      <span>
                        {result.user.firstName} {result.user.lastName}
                      </span>
                    </div>
                  </Link>
                  <div
                    className="bg-tertiary-hover cursor-pointer rounded-full p-1.5 hover:brightness-125"
                    onClick={async () =>
                      await handleDeleteFromSearchHistory(result.user._id)
                    }
                  >
                    <HiXMark className="text-tertiary text-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      <div className="max-h-[50dvh] overflow-y-scroll">
        {state.search.results.map((result) => (
          <Link
            to={`/profile/${result.username}`}
            className="bg-tertiary-hover text-secondary flex items-center gap-3 rounded-md p-2"
            onClick={() => handleAddToSearchHistory(result._id)}
            key={result._id}
          >
            <img
              src={result.picture}
              alt={result.username}
              className="aspect-square w-[35px] rounded-full"
            />
            <span>
              {result.firstName} {result.lastName}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HeaderSearchModal;
