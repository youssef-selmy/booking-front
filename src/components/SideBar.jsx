import { NavLink } from "react-router-dom";

const SideBar = ({ data = [] }) => {
  return (
    <div className="min-w-[200px] w-[200px] pt-[70px] min-h-full bg-white flex flex-col border-r border-[#ddd]">
      {data.map((ele, idx) => (
        ele.disabled ? (
          <div
            key={idx}
            title={ele.disabledTitle || ""}
            className="border-b border-[#ddd] p-3 text-stone-400 cursor-not-allowed select-none"
          >
            {ele.name}
          </div>
        ) : (
          <NavLink
            className={({ isActive }) =>
              [
                "border-b border-[#ddd] p-3 duration-300",
                isActive ? "bg-[#333] text-white" : "hover:bg-[#eee]",
              ]
                .filter(Boolean)
                .join(" ")
            }
            key={idx}
            to={ele.link}
          >
            {ele.name}
          </NavLink>
        )
      ))}
    </div>
  );
};

export default SideBar;
