import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import FrontDesk from "./pages/FrontDesk/FrontDesk";
import Owner from "./pages/Owner/Owner";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  { path: "/", element: <div>Hello</div> },
  { path: "/auth", element: <Login /> },
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/owner", element: <Owner /> },
  { path: "/front-desk", element: <FrontDesk /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
