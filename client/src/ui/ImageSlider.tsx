import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface ImageSliderProps {
  images: string[];
  close: () => void;
}

function ImageSlider({ images, close }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const { ref } = useOutsideClick(close);

  function handleShowPrev() {
    setImageIndex((i) => {
      if (i === 0) return images.length - 1;
      return i - 1;
    });
  }

  function handleShowNext() {
    setImageIndex((i) => {
      if (i === images.length - 1) return 0;
      return i + 1;
    });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 backdrop-blur-sm">
      <div
        className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-2xl"
        ref={ref}
      >
        <div className="flex flex-row overflow-hidden">
          {images.map((image) => (
            <div
              className="h-full w-full flex-shrink-0 flex-grow-0"
              key={image}
            >
              <img
                key={image}
                src={image}
                className="slider-img aspect-square h-full w-full object-cover"
                style={{ translate: `${-100 * imageIndex}%` }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleShowPrev}
          className="absolute bottom-0 left-0 top-0 w-[50px] bg-black bg-opacity-10 p-1 text-gray-700 transition-transform hover:-translate-x-[0.1rem] hover:text-gray-600"
        >
          <div className="mx-auto flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white bg-opacity-30 p-1.5 shadow-md">
            <MdKeyboardArrowLeft className="text-2xl" />
          </div>
        </button>
        <button
          onClick={handleShowNext}
          className="absolute bottom-0 right-0 top-0 w-[50px] bg-black bg-opacity-10 p-1 text-gray-700 transition-transform hover:translate-x-[0.1rem] hover:text-gray-600"
        >
          <div className="mx-auto flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white bg-opacity-30 p-1.5 shadow-md">
            <MdKeyboardArrowRight className="text-2xl" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default ImageSlider;
