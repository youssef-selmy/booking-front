import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TableFoot = ({ setLoading }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  function next() {
    if (page >= totalPages) return;
    setLoading(true);
    setPage((e) => e + 1);
    setLoading(false);
  }

  function prev() {
    if (page <= 1) return;
    setLoading(true);
    setPage((e) => e - 1);
    setLoading(false);
  }

  return (
    <div className="bg-white border border-[#ddd] border-t-0 p-2 flex justify-between items-center select-none">
      <div
        onClick={prev}
        className={`p-2 ${
          page <= 1
            ? "bg-[#888] cursor-not-allowed"
            : "bg-[#333] cursor-pointer hover:bg-[#444] duration-300"
        } text-white rounded`}
      >
        <FaArrowLeft />
      </div>
      <div>
        <span>{page}</span>
        <span className="text-[#aaa] font-medium">/{totalPages}</span>
      </div>
      <div
        onClick={next}
        className={`p-2 ${
          page === totalPages
            ? "bg-[#888] cursor-not-allowed"
            : "bg-[#333] cursor-pointer hover:bg-[#444] duration-300"
        } text-white rounded`}
      >
        <FaArrowRight />
      </div>
    </div>
  );
};

export default TableFoot