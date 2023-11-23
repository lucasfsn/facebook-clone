import HomeContacts from "../features/home/HomeContacts";
import HomeMain from "../features/home/HomeMain";
import HomeMenu from "../features/home/HomeMenu";

function Home() {
  return (
    <div className="flex max-h-[calc(100vh_-_87px)] flex-row justify-between gap-3 overflow-scroll">
      <HomeMenu />
      <HomeMain />
      <HomeContacts />
    </div>
  );
}

export default Home;
