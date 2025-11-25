import { Outlet } from "react-router-dom";
import Section from "../../../components/Section";
import SidBar from "../../../components/SidBar";

const OwnerRooms = () => {
  return (
    <Section classname='flex'>
      <SidBar
        data={[
          { name: "Managment", link: "managment" },
          { name: "Type", link: "type" },
          { name: "Category", link: "category" },
          { name: "Package", link: "package" },
          { name: "Pricing", link: "pricing" },
          { name: "Services", link: "services" },
        ]}
      />
      <Outlet />
    </Section>
  );
};

export default OwnerRooms;
