import React from "react";

const Section = ({ children, classname }) => {
  return <section className={`min-h-screen pt-[70px] ${classname}`}>{children}</section>;
};

export default Section;
