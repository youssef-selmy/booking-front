import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import Pricing from "./pages/Owner/Rooms/Pricing/Pricing";
import Package from "./pages/Owner/Rooms/Package";
import Category from "./pages/Owner/Rooms/Category";
import CategoryPricing from "./pages/Owner/Rooms/Pricing/CategoryPricing";
import ViewPricing from "./pages/Owner/Rooms/Pricing/ViewPricing";
import TypePricing from "./pages/Owner/Rooms/Pricing/TypePricing";
import FloorPricing from "./pages/Owner/Rooms/Pricing/FloorPricing";
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
      { path: "inventory", element: <Inventory /> },
      { path: "finance", element: <Finance /> },
      { path: "miscellaneous", element: <Miscellaneous /> },
      { path: "reports", element: <Reports /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
