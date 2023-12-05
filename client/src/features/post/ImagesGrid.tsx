interface ImagesGridProps {
  images: string[];
}

function ImagesGrid({ images }: ImagesGridProps) {
  return (
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
          <img src={img} className="h-full w-full object-cover" />
          {index === 4 && images.length > 5 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-3xl font-semibold text-white">
              +{images.length - 4}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ImagesGrid;