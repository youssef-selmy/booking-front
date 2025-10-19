import React from "react";

const Button = ({
  children,
  full = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={`${full ? "w-full" : "min-w-[150px]"} rounded font-medium cursor-pointer hover:bg-[#444] duration-300 ${ disabled ? "bg-[#555]" : "bg-[#333]" } text-white p-2`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
