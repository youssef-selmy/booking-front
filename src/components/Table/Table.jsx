import React, { useState } from "react";
import TableFoot from "./TableFoot";
import TableContent from "./TableContent";
import TableData from "./TableData";
import TableLink from "./TableLink";

const Table = ({
  head = [],
  smallArr = [],
  dataKeys = [],
  testData = [],
  view = null,
  edit = null,
  remove = null,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(testData);
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
            {view && <TableData small>{view.name}</TableData>}
          </tr>
        </thead>
        <TableContent loading={loading} data={data} dataKeys={dataKeys} view={view} />
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

export default Table;
