import { useState } from "react";
import { useSelector } from "react-redux";
import ImageSlider from "../../ui/ImageSlider";
import { getImages } from "./imagesSlice";

interface ImagesProfileProps {
  space: number;
  location: "profile" | "photos";
}

function ImagesProfile({ space, location }: ImagesProfileProps) {
  const images = useSelector(getImages);
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  function handleCloseSlider() {
    setShowSlider(false);
  }

  return (
    <div
      className={`grid gap-${space} ${
        location === "profile"
          ? "grid-cols-3 overflow-x-hidden rounded-md"
          : "grid-cols-5"
      }`}
    >
      {showSlider && (
        <ImageSlider
          images={images.map((image) => image.url)}
          close={handleCloseSlider}
          start={selectedImage}
        />
      )}
      {(location === "profile" ? images.slice(0, 9) : images).map(
        (image, index) => (
          <img
            src={image.url}
            key={image.url}
            className={`aspect-square h-full w-full cursor-pointer object-cover ${
              location === "photos" ? "rounded-md" : ""
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

export default ImagesProfile;
