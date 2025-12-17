import React from "react";
import Section from "../../../../components/Section";
import SideBar from "../../../../components/SideBar";
import { Outlet } from "react-router-dom";

const data = [
  { name: "Arrival", link: "arrival" },
  { name: "Departure", link: "departure" },
  { name: "In House", link: "in-house" },
  { name: "No Show", link: "no-show" },
];

const FrontOffice = () => {
  return (
    <Section disapleTopPadding classname="flex">
      <SideBar data={data} />
      <Outlet />
    </Section>
  );
};

export default FrontOffice;
