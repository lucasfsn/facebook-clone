import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import { useRef, useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { useDarkMode } from "../../context/DarkModeContext";
import { PostRes } from "./postSlice";

type DarkModeOptions = "on" | "off" | "auto";

interface EditPostFormProps {
  post: PostRes;
  withImage?: boolean;
}

function EditPostForm({ post, withImage = false }: EditPostFormProps) {
  const [text, setText] = useState<string>(post.content);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { darkMode } = useDarkMode();
  const postRef = useRef<HTMLTextAreaElement>(null);

  function handleShowEmojiPicker() {
    setShowEmojiPicker((show) => !show);
  }

  function handleAddEmoji({ emoji }: EmojiClickData) {
    postRef.current?.focus();

    setText((prev) => prev + emoji);
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

  return (
    <div className="relative">
      <textarea
        ref={postRef}
        value={text}
        maxLength={150}
        onChange={(e) => setText(e.target.value)}
        className={`bg-primary w-full resize-none focus:outline-none ${
          withImage ? "h-min text-base" : "h-40 text-2xl"
        }`}
      />
      {showEmojiPicker && (
        <div
          className={`absolute z-50 ${
            withImage ? "-right-1/2 top-8" : "-right-1/3 bottom-8"
          }`}
        >
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
      <FaRegSmile
        className={`text-tertiary absolute right-2 cursor-pointer text-2xl transition-all hover:text-gray-300 ${
          withImage ? "top-0" : "bottom-0"
        }`}
        onClick={handleShowEmojiPicker}
      />
    </div>
  );
}

export default EditPostForm;
