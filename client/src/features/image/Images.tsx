import ImagesGridProfile from "./ImagesGridProfile";

function Images() {
  return (
    <div className="text-secondary w-full p-4 lg:mx-auto lg:w-4/6">
      <div className="bg-primary flex w-full flex-col gap-4 rounded-md px-4 py-3">
        <h2 className="text-xl font-bold">Photos</h2>
        <ImagesGridProfile type="photos" space={2} />
      </div>
    </div>
  );
}

export default Images;
