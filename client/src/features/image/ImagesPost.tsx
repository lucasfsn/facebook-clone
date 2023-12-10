import { useState } from "react";
import { useSelector } from "react-redux";
import ImageSlider from "../../ui/ImageSlider";
import { getUserProfile } from "../profile/profileSlice";

interface ImagesPostProps {
  images: string[];
  type: "profile" | "cover" | "post" | "details";
}

function ImagesPost({ images, type }: ImagesPostProps) {
  const [showSlider, setShowSlider] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const profile = useSelector(getUserProfile);

  function handleCloseSlider() {
    setShowSlider(false);
  }

  return (
    <>
      {showSlider && (
        <ImageSlider
          images={images}
          close={handleCloseSlider}
          start={selectedImage}
        />
      )}
      <div className="grid grid-cols-6 gap-0.5 overflow-x-hidden">
        {images.slice(0, 5).map((img, index) => (
          <div
            key={img}
            className={`relative ${
              images.length >= 5
                ? index < 2
                  ? "col-span-3"
                  : "col-span-2"
                : images.length % 2 !== 0 && index === 0
                ? "col-span-6"
                : "col-span-3"
            } ${type === "profile" ? "profile-post" : ""}`}
            style={
              profile.cover && type === "profile"
                ? { backgroundImage: `url(${profile.cover})`, height: "50%" }
                : {}
            }
          >
            <img
              src={img}
              className={`cursor-pointer object-cover ${
                type === "cover"
                  ? "aspect-video h-full w-full"
                  : type === "profile"
                  ? "mx-auto aspect-square w-2/3 rounded-full"
                  : "aspect-square h-full w-full"
              }`}
              onClick={() => {
                setShowSlider(true);
                setSelectedImage(index);
              }}
            />
            {index === 4 && images.length > 5 && (
              <div
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 text-3xl font-semibold text-white hover:bg-opacity-[0.45]"
                onClick={() => {
                  setShowSlider(true);
                  setSelectedImage(index);
                }}
              >
                +{images.length - 4}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ImagesPost;
