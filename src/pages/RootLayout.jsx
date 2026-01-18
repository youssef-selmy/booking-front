import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../store/AuthProvider";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
export default RootLayout;
