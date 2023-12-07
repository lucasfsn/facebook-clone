import { useState } from "react";
import { useSelector } from "react-redux";
import ImageSlider from "../../ui/ImageSlider";
import { getImages } from "./imagesSlice";

interface ImagesGridProfileProps {
  space: number;
  type: "profile" | "photos";
}

function ImagesGridProfile({ space, type }: ImagesGridProfileProps) {
  const images = useSelector(getImages);
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  function handleCloseSlider() {
    setShowSlider(false);
  }

  return (
    <div
      className={`grid gap-${space} ${
        type === "profile"
          ? "grid-cols-3 overflow-x-hidden rounded-md"
          : "grid-cols-5"
      }`}
    >
      {showSlider && (
        <ImageSlider
          images={images}
          close={handleCloseSlider}
          start={selectedImage}
        />
      )}
      {(type === "profile" ? images.slice(0, 9) : images).map(
        (image, index) => (
          <img
            src={image}
            key={image}
            className={`aspect-square h-full w-full cursor-pointer object-cover ${
              type === "photos" ? "rounded-md" : ""
            }`}
            onClick={() => {
              setShowSlider(true);
              setSelectedImage(index);
            }}
          />
        ),
      )}
    </div>
  );
}

export default ImagesGridProfile;
