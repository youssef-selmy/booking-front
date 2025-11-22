import React, { useState, useRef, useEffect } from "react";

const SelectMenu = ({
  title,
  required = false,
  options = [
    { id: 0, name: "test" },
    { id: 1, name: "one" },
    { id: 2, name: "two" },
  ],
  value,
  setValue,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative w-[220px] mt-[10px] border border-[#ddd] rounded p-2"
    >
      <div
        className="cursor-pointer hover:border-[#333] duration-300"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <div className="bg-white flex items-center justify-center px-2 absolute -top-[10px] left-1.5">
          <p className="text-[12px] font-medium text-ston">
            {title}
            {required && <span className="text-red-600 ml-[2px]">*</span>}
          </p>
        </div>
        <p>{value?.name || "Not Selected"}</p>
      </div>

      {showMenu && (
        <Menu options={options} setValue={setValue} setShowMenu={setShowMenu} />
      )}
    </div>
  );
};

const Menu = ({ options = [], setValue, setShowMenu }) => {
  return (
    <div className="absolute z-50 border border-[#ddd] w-full left-0 top-10 bg-white">
      {options.length === 0 && <p className="p-2">No Options</p>}
      {options.map((ele, idx) => (
        <p
          key={idx}
          onClick={() => {
            setValue(ele);
            setShowMenu(false);
          }}
          className={`p-2 cursor-pointer hover:bg-[#eee] duration-300 ${
            idx % 2 === 0 ? "bg-white" : "bg-[#f5f5f5]"
          } border-b border-[#ddd] ${
            idx + 1 === options.length && "border-b-0"
          }`}
        >
          {ele.name}
        </p>
      ))}
    </div>
  );
};

export default SelectMenu;
