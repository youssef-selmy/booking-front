import React from "react";
import Section from "../../../../components/Section";
import SideBar from "../../../../components/SideBar";
import { Outlet } from "react-router-dom";

const Finance = () => {
  const data = [
    { name: "Folio History", link: "folio-history" },
    { name: "Casher Report", link: "casher" },
    { name: "Currency Converter", link: "currency-calculator" },
  ];

  return (
    <Section disapleTopPadding classname="flex">
      <SideBar data={data} />
      <Outlet />
    </Section>
  );
};

export default Finance;
