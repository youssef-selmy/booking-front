import React from "react";

const Button = ({
  children,
  full = false,
  fit = false,
  disabled = false,
  onClick,
  className,
}) => {
  return (
    <button
      className={`${full ? "w-full" : fit ? 'w-fit' : 'min-w-[150px]'} rounded font-medium ${
        disabled
          ? "cursor-not-allowed bg-[#888]"
          : "bg-[#333] cursor-pointer hover:bg-[#444]"
      }  duration-300 text-white p-2 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
