import React from "react";

const Button = ({
  children,
  full = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={`${full ? "w-full" : "min-w-[150px]"} rounded font-medium ${disabled ? "cursor-not-allowed bg-[#888]" : "bg-[#333] cursor-pointer hover:bg-[#444]"}  duration-300 text-white p-2`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
