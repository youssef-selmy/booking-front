import React from "react";
import Section from "../../../../components/Section";
import SideBar from "../../../../components/SideBar";
import { Outlet } from "react-router-dom";

// front‑desk reports list – each entry corresponds to an endpoint in /api/reports
const data = [
  { name: "Expected Arrivals", link: "expected-arrivals" },
  { name: "In House Guests", link: "in-house" },
  { name: "Reservation Ledger", link: "reservation-ledger" },
  { name: "No‑Show / Cancel", link: "no-show-cancel" },
  { name: "Police Report", link: "police" },
  { name: "Room Status", link: "room-status" },
  { name: "Night Audit", link: "night-audit" },
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
