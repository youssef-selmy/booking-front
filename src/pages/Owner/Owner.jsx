import { Outlet, useLocation } from "react-router-dom";
import OwnerNav from "./OwnerNav";

const Owner = () => {
  const location = useLocation();
  const showNav = location.pathname !== "/owner";
  return (
    <main className="w-full min-h-screen">
      {showNav && <OwnerNav />}
      <Outlet />
    </main>
  );
};

export default Owner;
