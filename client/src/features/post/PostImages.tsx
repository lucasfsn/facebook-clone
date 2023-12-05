import ImagesGrid from "./ImagesGrid";

interface PostImagesProps {
  images: string[];
}

function PostImages({ images }: PostImagesProps) {
  return <ImagesGrid images={images} />;
}

export default PostImages;
