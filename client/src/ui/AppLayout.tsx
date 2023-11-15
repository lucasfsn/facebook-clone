import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="mt-[60px]">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
