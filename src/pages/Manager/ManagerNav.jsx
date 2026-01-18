import { Link, NavLink } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const pages = [
  { name: "Dashboard", url: "dashboard" },
  { name: "Users", url: "users" },
  { name: "Rooms", url: "rooms", isParent: true },
  { name: "Reports", url: "reports" },
];

const ManagerNav = () => {
  return (
    <header className="w-full h-[70px] border-b border-[#ddd] flex fixed bg-white">
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
          end={!ele.isParent}
        >
          {ele.name}
        </NavLink>
      ))}
      <Link
        to="/manager"
        className="w-[350px] flex justify-center items-center bg-[#333] text-white"
      >
        <IoIosLogOut size={25} />
      </Link>
    </header>
  );
};

export default ManagerNav;
