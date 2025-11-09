import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  { path: "/", element: <div>Hello</div> },
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
    ],
  },
  { path: "/front-desk", element: <FrontDesk /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
