import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../store/AuthProvider";
import { IoIosLogOut } from "react-icons/io";

const pages = [
  { name: "Booking", url: "booking" },
  { name: "Front Office", url: "front-office" },
  { name: "Inventory", url: "inventory" },
  { name: "Finance", url: "finance" },
  { name: "Reports", url: "reports" },
];

const FrontDeskNav = () => {
  const { isManager, logout } = useAuth();
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
      {isManager && (
        <Link
          to="/manager"
          className="w-[350px] flex justify-center items-center bg-[#333] text-white"
        >
          <IoIosLogOut size={25} />
        </Link>
      )}
      {!isManager && (
        <button
          onClick={logout}
          className="w-[350px] flex justify-center items-center bg-[#333] text-white"
        >
          <IoIosLogOut size={25} />
        </button>
      )}
    </header>
  );
};

export default FrontDeskNav;
