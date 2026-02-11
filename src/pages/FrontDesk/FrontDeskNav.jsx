import { NavLink } from "react-router-dom";

const pages = [
  { name: "Booking", url: "booking" },
  { name: "Front Office", url: "front-office" },
  { name: "Inventory", url: "inventory" },
  { name: "Finance", url: "finance" },
  { name: "Reports", url: "reports" },
];

const FrontDeskNav = () => {
  return (
    <header className="w-full h-[70px] border-b border-[#ddd] flex fixed bg-white z-10">
      {pages.map((ele, idx) => (
        <NavLink
          key={idx}
          to={ele.url}
          className={({ isActive }) =>
            [
              "w-full h-full border-r border-[#ddd] p-2 flex justify-center items-center text-lg  duration-300",
              isActive ? "bg-[#333] text-white" : "hover:bg-[#ddd]",
            ]
              .filter(Boolean)
              .join(" ")
          }
        >
          {ele.name}
        </NavLink>
      ))}
    </header>
  );
};

export default FrontDeskNav;
