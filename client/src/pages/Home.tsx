import HomeContacts from "../features/home/HomeContacts";
import HomeMain from "../features/home/HomeMain";
import HomeMenu from "../features/home/HomeMenu";

function Home() {
  return (
    <div>
      <HomeMenu />
      <HomeMain />
      <HomeContacts />
    </div>
  );
}

export default Home;
