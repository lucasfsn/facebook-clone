import { useState } from "react";
import ImageSlider from "../../ui/ImageSlider";

interface ImagesGridPostProps {
  images: string[];
}

function ImagesGridPost({ images }: ImagesGridPostProps) {
  const [showSlider, setShowSlider] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

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
            }`}
          >
            <img
              src={img}
              className="aspect-square h-full w-full cursor-pointer object-cover"
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

export default ImagesGridPost;
