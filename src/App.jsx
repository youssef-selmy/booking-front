import { createBrowserRouter, Link, Navigate, RouterProvider } from "react-router-dom";
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
import OwnerRooms from "./pages/Owner/Rooms/OwnerRooms";
import Managment from "./pages/Owner/Rooms/Managment";
import Type from "./pages/Owner/Rooms/Type";
import Services from "./pages/Owner/Rooms/Services";
import Pricing from "./pages/Owner/Rooms/Pricing";
import Package from "./pages/Owner/Rooms/Package";
import Category from "./pages/Owner/Rooms/Category";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex gap-5 p-5">
        <Link to="owner" className="underline">
          Owner
        </Link>
        <Link to="admin" className="underline">
          Admin
        </Link>
        <Link to="auth/login" className="underline">
          Login
        </Link>
      </div>
    ),
  },
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
      {
        path: "rooms",
        element: <OwnerRooms />,
        children: [
          { index: true, element: <Navigate to="managment" replace /> },
          { path: "managment", element: <Managment /> },
          { path: "type", element: <Type /> },
          { path: "category", element: <Category /> },
          { path: "package", element: <Package /> },
          { path: "pricing", element: <Pricing /> },
          { path: "services", element: <Services /> },
        ],
      },
    ],
  },
  { path: "/front-desk", element: <FrontDesk /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
