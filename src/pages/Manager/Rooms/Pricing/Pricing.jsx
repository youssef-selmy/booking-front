import Section from "../../../../components/Section";
import { NavLink, Outlet } from "react-router-dom";

const Pricing = () => {
  return (
    <Section extraPadding classname="p-5 flex flex-col gap-5 w-full">
      <NavigatorBar />
      <Outlet />
    </Section>
  );
};
const NavigatorBar = () => {
  return (
    <div className="w-full border border-[#ddd] rounded flex">
      <NavLink
        to="category"
        className={({ isActive }) =>
          [
            "text-center text-lg p-3 duration-300 w-full border-r border-[#ddd]",
            isActive ? "bg-[#333] text-white" : "bg-white hover:bg-[#eee]",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        Category
      </NavLink>
      <NavLink
        to="type"
        className={({ isActive }) =>
          [
            "text-center text-lg p-3 duration-300 w-full border-r border-[#ddd]",
            isActive ? "bg-[#333] text-white" : "bg-white hover:bg-[#eee]",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        Type
      </NavLink>
      <NavLink
        to="view"
        className={({ isActive }) =>
          [
            "text-center text-lg p-3 duration-300 w-full border-r border-[#ddd]",
            isActive ? "bg-[#333] text-white" : "bg-white hover:bg-[#eee]",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        View
      </NavLink>
      <NavLink
        to="floor"
        className={({ isActive }) =>
          [
            "text-center text-lg p-3 duration-300 w-full border-r border-[#ddd]",
            isActive ? "bg-[#333] text-white" : "bg-white hover:bg-[#eee]",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        Floor
      </NavLink>
    </div>
  );
};

export default Pricing;
