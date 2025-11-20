import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TableFoot = ({ pagenationData, next, prev }) => {
  return (
    <div className="bg-white border border-[#ddd] border-t-0 p-2 flex justify-between items-center select-none">
      <div
        onClick={prev}
        className={`p-2 ${
          pagenationData.currentPage <= 1
            ? "bg-[#888] cursor-not-allowed"
            : "bg-[#333] cursor-pointer hover:bg-[#444] duration-300"
        } text-white rounded`}
      >
        <FaArrowLeft />
      </div>
      <div>
        <span>{pagenationData.currentPage}</span>
        <span className="text-[#aaa] font-medium">
          /{pagenationData.totalPages}
        </span>
      </div>
      <div
        onClick={next}
        className={`p-2 ${
          pagenationData.currentPage === pagenationData.totalPages
            ? "bg-[#888] cursor-not-allowed"
            : "bg-[#333] cursor-pointer hover:bg-[#444] duration-300"
        } text-white rounded`}
      >
        <FaArrowRight />
      </div>
    </div>
  );
};

export default TableFoot;