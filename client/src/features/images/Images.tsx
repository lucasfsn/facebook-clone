import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import Spinner from "../../ui/Spinner";
import { fetchImages, getImages, getLoading } from "./imagesSlice";

function Images() {
  const dispatch: AppDispatch = useDispatch();
  const images = useSelector(getImages);
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    dispatch(
      fetchImages({
        path: "test/posts/images",
        sort: "desc",
      }),
    );
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  console.log(images);

  return (
    <div className="bg-primary flex flex-col ">
      <div>dsa</div>
    </div>
  );
}

export default Images;
