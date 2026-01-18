import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import FrontDesk from "./pages/FrontDesk/FrontDesk";
import ManagerHome from "./pages/Manager/ManagerHome";
import Manager from "./pages/Manager/Manager";
import NotFound from "./pages/NotFound";
import Register from "./pages/Auth/Register";
import Complete from "./pages/Auth/Complete";
import RequestDetails from "./pages/Admin/Details/RequestDetails";
import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import ManagerUsers from "./pages/Manager/ManagerUsers";
import ManagerRooms from "./pages/Manager/Rooms/ManagerRooms";
import Managment from "./pages/Manager/Rooms/Managment";
import Type from "./pages/Manager/Rooms/Type";
import Services from "./pages/Manager/Rooms/Services";
import Pricing from "./pages/Manager/Rooms/Pricing/Pricing";
import Package from "./pages/Manager/Rooms/Package";
import Category from "./pages/Manager/Rooms/Category";
import CategoryPricing from "./pages/Manager/Rooms/Pricing/CategoryPricing";
import ViewPricing from "./pages/Manager/Rooms/Pricing/ViewPricing";
import TypePricing from "./pages/Manager/Rooms/Pricing/TypePricing";
import FloorPricing from "./pages/Manager/Rooms/Pricing/FloorPricing";
import Booking from "./pages/FrontDesk/Sections/Booking/Booking";
import FrontOffice from "./pages/FrontDesk/Sections/FrontOffice/FrontOffice";
import Inventory from "./pages/FrontDesk/Sections/Inventory/Inventory";
import Finance from "./pages/FrontDesk/Sections/Finance/Finance";
import Miscellaneous from "./pages/FrontDesk/Sections/Miscellaneous/Miscellaneous";
import Reports from "./pages/FrontDesk/Sections/Reports/Reports";
import ManageReservation from "./pages/FrontDesk/Sections/Booking/ManageReservation";
import CreatePosting from "./pages/FrontDesk/Sections/Booking/CreatePosting/CreatePosting";
import Availability from "./pages/FrontDesk/Sections/Booking/Availability";
import RoomDiary from "./pages/FrontDesk/Sections/Booking/RoomDiary";
import Arrival from "./pages/FrontDesk/Sections/FrontOffice/Arrival";
import Departure from "./pages/FrontDesk/Sections/FrontOffice/Departure";
import InHouse from "./pages/FrontDesk/Sections/FrontOffice/InHouse";
import NoShow from "./pages/FrontDesk/Sections/FrontOffice/NoShow";
import OutOfService from "./pages/FrontDesk/Sections/Inventory/OutOfService";
import HouseKeepingBoard from "./pages/FrontDesk/Sections/Inventory/HouseKeepingBoard";
import AdminAuth from "./components/AdminAuth";
import ManagerAuth from "./components/ManagerAuth";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
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
          {
            index: true,
            element: (
              <AdminAuth>
                <AdminDashboard />
              </AdminAuth>
            ),
          },
          {
            path: ":id",
            element: (
              <AdminAuth>
                <RequestDetails />
              </AdminAuth>
            ),
          },
        ],
      },
      {
        path: "/manager",
        element: (
          <ManagerAuth>
            <Manager />
          </ManagerAuth>
        ),
        children: [
          { index: true, element: <ManagerHome /> },
          { path: "dashboard", element: <ManagerDashboard /> },
          { path: "users", element: <ManagerUsers /> },
          {
            path: "rooms",
            element: <ManagerRooms />,
            children: [
              { index: true, element: <Navigate to="managment" replace /> },
              { path: "managment", element: <Managment /> },
              { path: "type", element: <Type /> },
              { path: "category", element: <Category /> },
              { path: "package", element: <Package /> },
              {
                path: "pricing",
                element: <Pricing />,
                children: [
                  { index: true, element: <Navigate to="category" replace /> },
                  { path: "category", element: <CategoryPricing /> },
                  { path: "type", element: <TypePricing /> },
                  { path: "view", element: <ViewPricing /> },
                  { path: "floor", element: <FloorPricing /> },
                ],
              },
              { path: "services", element: <Services /> },
            ],
          },
        ],
      },
      {
        path: "/front-desk",
        element: <FrontDesk />,
        children: [
          { index: true, element: <Navigate to="booking" replace /> },
          {
            path: "booking",
            element: <Booking />,
            children: [
              {
                index: true,
                element: <Navigate to="manage-reservation" replace />,
              },
              { path: "manage-reservation", element: <ManageReservation /> },
              { path: "create-posting", element: <CreatePosting /> },
              { path: "availability", element: <Availability /> },
              { path: "room-diary", element: <RoomDiary /> },
            ],
          },
          {
            path: "front-office",
            element: <FrontOffice />,
            children: [
              {
                index: true,
                element: <Navigate to="arrival" replace />,
              },
              { path: "arrival", element: <Arrival /> },
              { path: "departure", element: <Departure /> },
              { path: "in-house", element: <InHouse /> },
              { path: "no-show", element: <NoShow /> },
            ],
          },
          {
            path: "inventory",
            element: <Inventory />,
            children: [
              {
                index: true,
                element: <Navigate to="out-of-service" replace />,
              },
              { path: "out-of-service", element: <OutOfService /> },
              { path: "house-keeping-board", element: <HouseKeepingBoard /> },
            ],
          },
          { path: "finance", element: <Finance /> },
          { path: "miscellaneous", element: <Miscellaneous /> },
          { path: "reports", element: <Reports /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
