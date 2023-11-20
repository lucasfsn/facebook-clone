import HomeLeftMenu from "../features/home/HomeLeftMenu";
import HomeRightMenu from "../features/home/HomeRightMenu";

function Home() {
  return (
    <div className="flex h-[calc(100vh_-_56px)] flex-row justify-between bg-gray-100 px-1 py-4">
      <HomeLeftMenu />
      <div>Middle</div>
      <HomeRightMenu />
    </div>
  );
}

export default Home;
