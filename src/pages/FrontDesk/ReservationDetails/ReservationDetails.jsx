import React from "react";
import Section from "../../../components/Section";
import SideBar from "../../../components/SideBar";
import { Outlet } from "react-router-dom";

const data = [
  { name: "Main Info", link: "main-info" },
  { name: "Rooms", link: "rooms" },
  { name: "Services", link: "services" },
  { name: "Payments", link: "payments" },
  { name: "Alerts", link: "alerts" },
];

const ReservationDetails = () => {
  return (
    <main className="w-full h-full flex">
      <SideBar data={data} />
      <div className="px-5 w-full">
        <Outlet />
      </div>
    </main>
  );
};

export default ReservationDetails;
