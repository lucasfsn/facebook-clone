import {
  ChangeEvent,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import AvatarEditor from "react-avatar-editor";
import toast from "react-hot-toast";
import { FaCamera, FaGlobeEurope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDarkMode } from "../../context/DarkModeContext";
import Button from "../../ui/Button";
import {
  MAX_FILE_SIZE,
  MIN_COVER_WIDTH,
  VALID_MIMETYPES,
} from "../../utils/constants";
import { getUser } from "../user/userSlice";
import AddCoverPhotoModal from "./AddCoverPhotoModal";
import { getUserProfile } from "./profileSlice";
import { useUpdateCover } from "./useUpdateCover";

type State = {
  cover: string;
  showAddCover: boolean;
  position: Position;
  showEditor: boolean;
  showCoverButton: boolean;
};

type Action =
  | { type: "cover/show" }
  | { type: "cover/set"; payload: string }
  | { type: "cover/uploaded" }
  | { type: "cover/position"; payload: Position }
  | { type: "cover/cancel" };

const initialState: State = {
  cover: "",
  showAddCover: false,
  position: { x: 0.5, y: 0.5 },
  showEditor: false,
  showCoverButton: true,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "cover/show":
      return { ...state, showAddCover: !state.showAddCover };
    case "cover/set":
      return {
        ...state,
        showEditor: true,
        cover: action.payload,
        showAddCover: false,
        showCoverButton: false,
      };
    case "cover/uploaded":
      return initialState;
    case "cover/position":
      return { ...state, position: action.payload };
    case "cover/cancel":
      return {
        ...state,
        cover: "",
        showEditor: false,
        showCoverButton: true,
      };
    default:
      return state;
  }
}

interface Position {
  x: number;
  y: number;
}

interface ProfileConverProps {
  isProfileOwner: boolean;
}

function ProfileCover({ isProfileOwner }: ProfileConverProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [width, setWidth] = useState<number>(0);

  const { updateCover } = useUpdateCover();
  const profile = useSelector(getUserProfile);
  const user = useSelector(getUser);
  const { isDarkMode } = useDarkMode();

  const containerRef = useRef<HTMLDivElement>(null);
  const coverBtnRef = useRef<HTMLButtonElement>(null);
  const uploadCoverRef = useRef<HTMLInputElement>(null);
  const ref = useRef<AvatarEditor>(null);

  useLayoutEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setWidth(Number(containerRef.current.offsetWidth));
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleShowCover() {
    dispatch({ type: "cover/show" });
  }

  function handleCancelCover() {
    dispatch({ type: "cover/cancel" });
  }

  function handlePositionChange(position: Position) {
    dispatch({ type: "cover/position", payload: position });
  }

  function handleAddCover(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const image = e.target.files[0];

    if (!VALID_MIMETYPES.includes(image.type)) {
      toast.error("Selected file type is not supported");
      return;
    }

    if (image.size > MAX_FILE_SIZE) {
      toast.error("Selected file is too large");
      return;
    }

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          if (img.width < MIN_COVER_WIDTH) {
            toast.error("This cover photo is too small");
            return;
          }
          dispatch({ type: "cover/set", payload: img.src });
        };
      };
    }
  }

  async function handleSaveCover() {
    if (!user) return;

    if (ref.current) {
      const imageUrl = ref.current.getImageScaledToCanvas().toDataURL();

      await updateCover(imageUrl, user);
    }

    dispatch({ type: "cover/uploaded" });
  }

  return (
    <div className="relative h-[350px]">
      <input
        type="file"
        ref={uploadCoverRef}
        hidden
        accept="image/jpeg,image/png,image/gif"
        onChange={handleAddCover}
      />
      {state.showEditor && (
        <div className="absolute left-0 top-0 z-10 flex w-full justify-between bg-black bg-opacity-50 p-3.5">
          <div className="flex flex-row items-center gap-2 text-white shadow-sm">
            <FaGlobeEurope className="text-base md:text-xl" />
            <span className="text-sm md:text-base">
              Your cover photo is public
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-white bg-opacity-20 text-sm hover:bg-opacity-30 md:text-[0.92rem]"
              onClick={handleCancelCover}
            >
              Cancel
            </Button>
            <Button
              className="whitespace-nowrap bg-blue-600 text-sm hover:bg-blue-500 md:text-[0.92rem]"
              onClick={handleSaveCover}
            >
              Save changes
            </Button>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className={`relative flex h-full w-full justify-end bg-gradient-to-t shadow-3xl xl:mx-auto xl:w-4/6 xl:rounded-b-lg ${
          isDarkMode
            ? "from-black via-neutral-950 to-neutral-900"
            : "from-gray-400 via-gray-100 to-white"
        }`}
        style={
          profile.cover ? { backgroundImage: `url(${profile.cover})` } : {}
        }
      >
        {state.showEditor && (
          <AvatarEditor
            ref={ref}
            style={{
              top: "0",
              left: "0",
              position: "absolute",
              objectFit: "contain",
              cursor: "move",
            }}
            image={state.cover}
            width={width}
            height={350}
            border={0}
            color={[255, 255, 255, 0.1]}
            position={state.position}
            onPositionChange={handlePositionChange}
          />
        )}
        {isProfileOwner && state.showCoverButton && (
          <div className="relative self-end px-4 py-2">
            <button
              onClick={handleShowCover}
              className="flex flex-row items-center gap-1.5 self-end rounded-md bg-black bg-opacity-60 px-3 py-1.5 text-white hover:bg-opacity-70 active:text-[0.95rem]"
              ref={coverBtnRef}
            >
              <FaCamera />
              <span>
                {profile?.cover ? "Edit cover photo" : "Add cover photo"}
              </span>
            </button>
            {state.showAddCover && (
              <AddCoverPhotoModal
                button={coverBtnRef}
                close={() => dispatch({ type: "cover/show" })}
                uploadCoverRef={uploadCoverRef}
                showRemove={!!profile?.cover}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileCover;
