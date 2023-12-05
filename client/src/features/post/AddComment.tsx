import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaRegSmile } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { IoCameraOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { DarkModeOptions, useDarkMode } from "../../context/DarkModeContext";
import { MAX_FILE_SIZE, VALID_MIMETYPES } from "../../utils/constants";
import { getUser } from "../user/userSlice";

function AddComment() {
  const user = useSelector(getUser);

  const [comment, setComment] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const { darkMode } = useDarkMode();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  function handleShowEmojiPicker() {
    console.log("halo");
    setShowEmojiPicker((show) => !show);
  }

  function handleAddEmoji({ emoji }: EmojiClickData) {
    const ref = inputRef.current;
    ref?.focus();

    setComment((prev) => prev + emoji);
  }

  function setEmojiPickerMode(darkMode: DarkModeOptions): Theme | undefined {
    switch (darkMode) {
      case "on":
        return Theme.DARK;
      case "off":
        return Theme.LIGHT;
      case "auto":
        return Theme.AUTO;
      default:
        return undefined;
    }
  }

  function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
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
        if (e.target) {
          setImage(e.target.result as string);
        }
      };
    }
  }

  return (
    <div className="flex flex-col gap-4 py-3">
      <div className="flex flex-row items-center gap-1.5">
        <img
          src={user?.picture}
          alt={user?.firstName}
          className="w-[35px] rounded-full"
        />
        <div className="bg-tertiary relative flex flex-grow flex-row items-center justify-between rounded-full px-3 py-1">
          {showEmojiPicker && (
            <div className="absolute bottom-full right-0 z-50">
              <EmojiPicker
                emojiStyle={EmojiStyle.FACEBOOK}
                theme={setEmojiPickerMode(darkMode)}
                height={225}
                width={350}
                searchDisabled={true}
                skinTonesDisabled={true}
                previewConfig={{
                  showPreview: false,
                }}
                lazyLoadEmojis={true}
                onEmojiClick={handleAddEmoji}
              />
            </div>
          )}
          <input
            type="file"
            ref={inputFileRef}
            accept="image/jpeg,image/png,image/gif"
            onChange={handleAddImage}
            hidden
          />
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            placeholder="Write a public comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex flex-row">
            <div
              className="bg-tertiary-hover cursor-pointer rounded-full p-2"
              onClick={handleShowEmojiPicker}
            >
              <FaRegSmile />
            </div>
            <div
              className="bg-tertiary-hover cursor-pointer rounded-full p-2"
              onClick={() => inputFileRef.current?.click()}
            >
              <IoCameraOutline />
            </div>
          </div>
        </div>
      </div>
      {image && (
        <div className="relative">
          <img
            src={image}
            alt="comment-image"
            className="ml-[45px] h-[70px] self-start object-contain"
          />
          <button
            className="bg-tertiary-hover bg-tertiary absolute right-2 top-0 z-20 cursor-pointer rounded-full p-1"
            onClick={() => setImage("")}
          >
            <HiXMark className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}

export default AddComment;
