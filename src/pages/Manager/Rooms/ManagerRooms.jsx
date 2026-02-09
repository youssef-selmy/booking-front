import { Outlet } from "react-router-dom";
import Section from "../../../components/Section";
import SidBar from "../../../components/SideBar";

const ManagerRooms = () => {
  return (
    <Section disapleTopPadding classname='flex'>
      <SidBar
        data={[
          { name: "Managment", link: "managment" },
          { name: "Type", link: "type" },
          { name: "Category", link: "category" },
          { name: "Package", link: "package" },
          { name: "Services", link: "services" },
        ]}
      />
      <Outlet />
    </Section>
  );
};

export default ManagerRooms;
