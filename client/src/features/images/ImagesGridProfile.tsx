import { useState } from "react";
import { useSelector } from "react-redux";
import ImageSlider from "../../ui/ImageSlider";
import { getImages } from "./imagesSlice";

interface ImagesGridProfileProps {
  space: number;
  max?: number;
}

function ImagesGridProfile({ space, max }: ImagesGridProfileProps) {
  const images = useSelector(getImages);
  const [showSlider, setShowSlider] = useState<boolean>(false);

  function handleCloseSlider() {
    setShowSlider(false);
  }

  return (
    <div className={`grid gap-${space} ${max ? "grid-cols-3" : "grid-cols-5"}`}>
      {showSlider && <ImageSlider images={images} close={handleCloseSlider} />}
      {(max ? images.slice(0, max) : images).map((image) => (
        <img
          src={image}
          key={image}
          className="aspect-square h-full w-full cursor-pointer rounded-md object-cover"
          onClick={() => setShowSlider(true)}
        />
      ))}
    </div>
  );
}

export default ImagesGridProfile;
