interface HomeStoryProps {
  story: {
    storyImage: string;
    profileName: string;
    profilePicture: string;
  };
}

function HomeStory({ story }: HomeStoryProps) {
  const { storyImage, profileName, profilePicture } = story;

  return (
    <div className="bg-primary scale-image relative flex h-[225px] w-[150px] cursor-pointer flex-col gap-5 overflow-hidden rounded-xl shadow-md">
      <img
        src={profilePicture}
        alt={profileName}
        className="absolute left-2.5 top-2.5 z-[1] h-[45px] w-[45px] rounded-full border-4 border-gray-700"
      />
      <img
        src={storyImage}
        alt="Story"
        className="story h-full rounded-t-xl object-cover"
      />
      <div className="absolute bottom-2.5 left-2.5 text-white">
        {profileName}
      </div>
    </div>
  );
}

export default HomeStory;
