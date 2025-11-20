import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import FrontDesk from "./pages/FrontDesk/FrontDesk";
import OwnerHome from "./pages/Owner/OwnerHome";
import Owner from "./pages/Owner/Owner";
import NotFound from "./pages/NotFound";
import Register from "./pages/Auth/Register";
import Complete from "./pages/Auth/Complete";
import RequestDetails from "./pages/Admin/Details/RequestDetails";
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
import Users from "./pages/Owner/Users";

const router = createBrowserRouter([
  { path: "/", element: <div className="flex gap-5 p-5">
    <Link to='owner' className="underline">Owner</Link>
    <Link to='admin' className="underline">Admin</Link>
    <Link to='auth/login' className="underline">Login</Link>
  </div> },
  {
    path: "/auth",
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "Complete", element: <Complete /> },
    ],
  },
  {
    path: "/admin",
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: ":id", element: <RequestDetails /> },
    ],
  },
  {
    path: "/owner",
    element: <Owner />,
    children: [
      { index: true, element: <OwnerHome /> },
      { path: "dashboard", element: <OwnerDashboard /> },
      { path: "users", element: <Users /> },
    ],
  },
  { path: "/front-desk", element: <FrontDesk /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
