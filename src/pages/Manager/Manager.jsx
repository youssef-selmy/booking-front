import { Outlet, useLocation } from "react-router-dom";
import ManagerNav from "./ManagerNav";

const Manager = () => {
  const location = useLocation();
  const showNav = location.pathname !== "/manager";
  return (
    <main className="w-full min-h-screen">
      {showNav && <ManagerNav />}
      <Outlet />
    </main>
  );
};

export default Manager;
