import React from "react";
import Section from "../../../components/Section";
import SideBar from "../../../components/SideBar";
import { Outlet } from "react-router-dom";

const links = [
  { name: "Manager Flash", link: "manager-flash" },
  { name: "Room Status", link: "room-status" },
  { name: "Folio History", link: "folio-history" },
  { name: "Cashier", link: "cashier" },
];

const Reports = () => (
  <Section disapleTopPadding classname="flex">
    <SideBar data={links} />
    <Outlet />
  </Section>
);

export default Reports;
