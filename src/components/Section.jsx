import React from "react";

const Section = ({ children, disapleTopPadding = false, extraPadding = false, classname }) => {
  return <section className={`min-h-screen ${disapleTopPadding ? '' : extraPadding ? 'pt-[90px]' : 'pt-[70px]'} ${classname}`}>{children}</section>;
};

export default Section;
