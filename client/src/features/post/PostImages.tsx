import ImagesGridPost from "../image/ImagesGridPost";

interface PostImagesProps {
  images: string[];
}

function PostImages({ images }: PostImagesProps) {
  return <ImagesGridPost images={images} />;
}

export default PostImages;
