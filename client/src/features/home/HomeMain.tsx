import { useLayoutEffect, useReducer, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { stories } from "../../../data/stories";
import AddPost from "../post/AddPost";
import { getUser } from "../user/userSlice";
import HomeStory from "./HomeStory";

type Direction = "left" | "right";

interface State {
  position: number;
  mainWidth: number;
  storyWidth: number;
  isAdjusted: boolean;
  newPos: number;
}

type Action =
  | { type: "set_position"; payload: number }
  | { type: "set_main_width"; payload: number }
  | { type: "set_story_width"; payload: number }
  | { type: "set_is_adjusted"; payload: boolean };

const initialState = {
  position: 0,
  mainWidth: 0,
  storyWidth: 0,
  isAdjusted: false,
  newPos: 0,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "set_position":
      return { ...state, position: action.payload };
    case "set_main_width":
      return { ...state, mainWidth: action.payload };
    case "set_story_width":
      return { ...state, storyWidth: action.payload };
    case "set_is_adjusted":
      return { ...state, isAdjusted: action.payload };
    default:
      return state;
  }
}

function HomeMain() {
  const user = useSelector(getUser);
  const [state, dispatch] = useReducer(reducer, initialState);
  const storiesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = document.querySelector<HTMLDivElement>(".main-middle");
    const storyElement =
      document.querySelector<HTMLDivElement>(".middle-story");

    dispatch({
      type: "set_story_width",
      payload: storyElement?.clientWidth || 0,
    });
    dispatch({ type: "set_main_width", payload: element?.clientWidth || 0 });

    function handleWindowResize() {
      dispatch({ type: "set_main_width", payload: element?.clientWidth || 0 });
      dispatch({ type: "set_is_adjusted", payload: false });
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function handleClick(direction: Direction) {
    let newPos;
    if (state.isAdjusted) {
      newPos =
        state.position +
        (direction === "left"
          ? -(state.storyWidth + 10)
          : state.storyWidth + 10);

      if (newPos <= 0) {
        dispatch({ type: "set_is_adjusted", payload: false });
        newPos = 0;
      }
    } else {
      const calcWidthRemaining =
        state.storyWidth -
        (state.mainWidth -
          Math.floor(state.mainWidth / state.storyWidth) *
            (state.storyWidth + 10));
      newPos =
        state.position +
        (direction === "left" ? -calcWidthRemaining : calcWidthRemaining);
      dispatch({ type: "set_is_adjusted", payload: true });
    }

    dispatch({ type: "set_position", payload: newPos });

    if (storiesRef.current) {
      storiesRef.current.scrollTo({
        left: newPos,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="main-middle text-secondary relative flex w-[800px] flex-col gap-6 overflow-x-hidden">
      {state.position > 0 && (
        <button
          onClick={() => handleClick("left")}
          className="bg-primary bg-tertiary-hover absolute left-3 top-[90px] z-10 flex h-[45px] w-[45px] items-center justify-center rounded-full shadow-md"
        >
          <IoIosArrowBack className="text-2xl" />
        </button>
      )}
      {state.position <
        state.storyWidth * (stories.length + 1) - state.mainWidth && (
        <button
          onClick={() => handleClick("right")}
          className="bg-primary bg-tertiary-hover absolute right-3 top-[90px] z-10 flex h-[45px] w-[45px] items-center justify-center rounded-full shadow-md"
        >
          <IoIosArrowForward className="text-2xl" />
        </button>
      )}
      <div
        ref={storiesRef}
        className="justify-left flex flex-row gap-[10px] overflow-x-hidden"
      >
        <div className="middle-story bg-primary scale-image flex h-[225px] w-[150px] min-w-[150px] cursor-pointer flex-col gap-2 overflow-hidden rounded-xl shadow-md">
          <div className="h-[75%] overflow-hidden">
            <img
              src={user?.picture}
              alt="Story"
              className="story h-full w-auto"
            />
          </div>
          <div className="relative flex justify-center">
            <div className="border-primary absolute -top-[27px] flex items-center justify-center rounded-full border-4 bg-blue-500 p-1 text-white">
              <FiPlus className="text-2xl" />
            </div>
            <div className="mt-2 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              Create story
            </div>
          </div>
        </div>
        {stories.map((story) => (
          <HomeStory key={story.profileName} story={story} />
        ))}
      </div>
      <AddPost />
    </div>
  );
}

export default HomeMain;
