import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import FrontDesk from "./pages/FrontDesk/FrontDesk";
import Owner from "./pages/Owner/Owner";
import NotFound from "./pages/NotFound";
import Register from "./pages/Auth/Register";
import Complete from "./pages/Auth/Complete";
import RequestDetails from "./pages/Admin/Details/RequestDetails";

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
  { path: "/owner", element: <Owner /> },
  { path: "/front-desk", element: <FrontDesk /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
