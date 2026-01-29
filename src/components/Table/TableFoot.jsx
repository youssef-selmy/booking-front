import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TableFoot = ({ pagenationData, next, prev, loading }) => {
  return (
    <div className="bg-white border border-[#ddd] border-t-0 p-2 flex justify-between items-center select-none">
      <div
        onClick={prev}
        className={`p-2 ${
          loading || pagenationData.currentPage <= 1
            ? "bg-[#888] cursor-not-allowed"
            : "bg-[#333] cursor-pointer hover:bg-[#444] duration-300"
        } text-white rounded`}
      >
        <FaArrowLeft />
      </div>
      <div>
        <span>{pagenationData.currentPage}</span>
        <span className="text-[#aaa] font-medium">
          /{pagenationData.numberOfPages}
        </span>
      </div>
      <div
        onClick={next}
        className={`p-2 ${
          loading || pagenationData.currentPage === pagenationData.numberOfPages
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