import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-secondary mt-[55px] flex flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
