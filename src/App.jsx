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
import ManagerUsers from "./pages/Manager/ManagerUsers/ManagerUsers";
import ManagerRooms from "./pages/Manager/Rooms/ManagerRooms";
import Managment from "./pages/Manager/Rooms/Managment/Managment";
import Type from "./pages/Manager/Rooms/Type";
import Services from "./pages/Manager/Rooms/Services";
import Package from "./pages/Manager/Rooms/Package";
import Category from "./pages/Manager/Rooms/Category";
import Booking from "./pages/FrontDesk/Sections/Booking/Booking";
import FrontOffice from "./pages/FrontDesk/Sections/FrontOffice/FrontOffice";
import Inventory from "./pages/FrontDesk/Sections/Inventory/Inventory";
import Finance from "./pages/FrontDesk/Sections/Finance/Finance";
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
import RootLayout from "./pages/RootLayout";
import NotAuthorized from "./pages/NotAuthorized";
import ReservationDetails from "./pages/FrontDesk/ReservationDetails/ReservationDetails";
import MainInfo from "./pages/FrontDesk/ReservationDetails/MainInfo";
import Rooms from "./pages/FrontDesk/ReservationDetails/Rooms";
import Payments from "./pages/FrontDesk/ReservationDetails/Payments";
import Alerts from "./pages/FrontDesk/ReservationDetails/Alerts";
import ReservationServices from "./pages/FrontDesk/ReservationDetails/ReservationServices";
import Print from "./pages/FrontDesk/ReservationDetails/Print";
import TravelAgents from "./pages/Manager/TravelAgents/TravelAgents";
import Casher from "./pages/FrontDesk/Sections/Finance/Casher";
import FolioHistory from "./pages/FrontDesk/Sections/Finance/FolioHistory";
import AuthLayer from "./components/AuthLayer";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/auth/login" replace />,
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
              <AuthLayer roles={["admin"]}>
                <AdminDashboard />
              </AuthLayer>
            ),
          },
          {
            path: ":id",
            element: (
              <AuthLayer roles={["admin"]}>
                <RequestDetails />
              </AuthLayer>
            ),
          },
        ],
      },
      {
        path: "/manager",
        element: (
          <AuthLayer roles={["manager"]}>
            <Manager />
          </AuthLayer>
        ),
        children: [
          { index: true, element: <ManagerHome /> },
          { path: "dashboard", element: <ManagerDashboard /> },
          { path: "users", element: <ManagerUsers /> },
          { path: "travel-agents", element: <TravelAgents /> },
          {
            path: "rooms",
            element: <ManagerRooms />,
            children: [
              { index: true, element: <Navigate to="managment" replace /> },
              { path: "managment", element: <Managment /> },
              { path: "type", element: <Type /> },
              { path: "category", element: <Category /> },
              { path: "package", element: <Package /> },
              { path: "services", element: <Services /> },
            ],
          },
        ],
      },
      {
        path: "/front-desk",
        element: (
          <AuthLayer roles={['manager', 'front desk']}>
            <FrontDesk />
          </AuthLayer>
        ),
        children: [
          { index: true, element: <Navigate to="booking" replace /> },
          {
            path: "reservation/:id",
            element: <ReservationDetails />,
            children: [
              { index: true, element: <Navigate to="main-info" replace /> },
              { path: "main-info", element: <MainInfo /> },
              { path: "rooms", element: <Rooms /> },
              { path: "services", element: <ReservationServices /> },
              { path: "payments", element: <Payments /> },
              { path: "alerts", element: <Alerts /> },
              { path: "print", element: <Print /> },
            ],
          },
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
          {
            path: "finance",
            element: <Finance />,
            children: [
              { index: true, element: <Navigate to="folio-history" replace /> },
              { path: "folio-history", element: <FolioHistory /> },
              { path: "casher", element: <Casher /> },
            ],
          },
          { path: "reports", element: <Reports /> },
        ],
      },
    ],
  },
  { path: "not-authorized", element: <NotAuthorized /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
