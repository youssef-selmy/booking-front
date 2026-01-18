import { Outlet, useLocation } from "react-router-dom";
import OwnerNav from "./ManagerNav";

const Manager = () => {
  const location = useLocation();
  const showNav = location.pathname !== "/manager";
  return (
    <main className="w-full min-h-screen">
      {showNav && <OwnerNav />}
      <Outlet />
    </main>
  );
};

export default Manager;
