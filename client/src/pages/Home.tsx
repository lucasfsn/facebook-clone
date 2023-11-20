import HomeLeftMenu from "../features/home/HomeLeftMenu";
import HomeMiddle from "../features/home/HomeMiddle";
import HomeRightMenu from "../features/home/HomeRightMenu";

function Home() {
  return (
    <div className="bg-secondary flex h-[calc(100vh_-_56px)] flex-row justify-between px-1 py-4">
      <HomeLeftMenu />
      <HomeMiddle />
      <HomeRightMenu />
    </div>
  );
}

export default Home;
