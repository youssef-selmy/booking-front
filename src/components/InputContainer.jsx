import React from "react";

const InputContainer = ({ children, title = null }) => {
  return (
    <div className="flex flex-col gap-5">
      {title && <h2 className="font-medium mb-[10px]">{title}</h2>}
      <div className="flex gap-5">{children}</div>
    </div>
  );
};

export default InputContainer;
