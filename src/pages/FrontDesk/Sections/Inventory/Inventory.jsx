import React from 'react'
import Section from "../../../../components/Section";
import SideBar from "../../../../components/SideBar";
import { Outlet } from "react-router-dom";

const data = [
  { name: "Out of Service", link: "out-of-service" },
  { name: "House Keeping Board", link: "house-keeping-board" },
]

const Inventory = () => {
  return (
    <Section disapleTopPadding classname="flex">
      <SideBar data={data} />
      <Outlet />
    </Section>
  )
}

export default Inventory