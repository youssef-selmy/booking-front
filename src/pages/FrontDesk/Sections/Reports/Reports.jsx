import React from "react";
import Section from "../../../../components/Section";
import SideBar from "../../../../components/SideBar";
import { Outlet } from "react-router-dom";

const data = [
  { name: "Create Posting", link: "create-posting" },
  { name: "Manage Reservation", link: "manage-reservation" },
  { name: "Availability", link: "availability" },
  { name: "Room Diary", link: "room-diary" },
];

const Reports = () => {
  return (
    <Section disapleTopPadding classname="flex">
      <SideBar data={data} />
      <Outlet />
    </Section>
  );
};

export default Reports;
