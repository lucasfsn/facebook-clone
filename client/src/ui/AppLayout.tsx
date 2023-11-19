import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="mt-[56px]">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
