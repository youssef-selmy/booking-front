import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Table = ({ children, head = [], smallArr = [] }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="">
      <table className="w-full bg-white border border-[#ddd] rounded-2xl">
        <thead className="w-full bg-[#333] text-white font-medium text-lg">
          <tr>
            {head.map((ele, idx) => (
              <TableData key={idx} small={smallArr.includes(idx + 1)}>
                {ele}
              </TableData>
            ))}
          </tr>
        </thead>
        <tbody className="w-full">{!loading && children}</tbody>
      </table>
      {loading && (
        <div className="bg-white border border-[#ddd] border-t-0 p-5 flex justify-center items-center">
          Loading...
        </div>
      )}
      <TableFoot setLoading={setLoading} />
    </div>
  );
};

export const TableRow = ({ children, rowNum }) => {
  return (
    <tr className={`w-full ${rowNum % 2 === 1 ? "bg-white" : "bg-[#f5f5f5]"}`}>
      {children}
    </tr>
  );
};

export const TableLink = ({ children, link }) => {
  return (
    <TableData>
      <div className="flex justify-center">
        <Link to={link}>{children}</Link>
      </div>
    </TableData>
  );
};

export const TableData = ({ children, colSpan = 1, small = false }) => {
  return (
    <td
      colSpan={colSpan}
      className={`text-center p-2 border border-[#ddd] ${
        small ? "w-[100px]" : ""
      }`}
    >
      {children}
    </td>
  );
};

export const TableFoot = ({ setLoading }) => {
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
