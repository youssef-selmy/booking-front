import TableFoot from "./TableFoot";
import TableContent from "./TableContent";
import TableData from "./TableData";
import { FiFilter } from "react-icons/fi";
import Button from "../Button";

const Table = ({
  children,
  head = [],
  smallArr = [],
  showFilters = false,
  showAdd = false,
  setMode,
  pagenationData = null,
  next,
  prev,
  loading = false
}) => {
  console.log('pagenationData', pagenationData)
  return (
    <div className="flex flex-col gap-5 w-full">
      <div>
        {(showFilters || showAdd) && (
          <div className="bg-white border border-[#ddd] border-b-0 flex flex-row-reverse p-2 gap-2">
            {showFilters && (
              <Button
                fit
                className="px-4 py-3"
                onClick={() => setMode("Filters")}
              >
                <FiFilter />
              </Button>
            )}
            {showAdd && <Button onClick={() => setMode("Add")}>Create</Button>}
          </div>
        )}
        <table className="w-full bg-white border border-[#ddd] rounded-2xl">
          <thead className="w-full bg-[#333] text-white font-medium text-lg">
            <tr>
              {head.map((ele, idx) => (
                <TableData key={idx} small={smallArr.includes(ele)}>
                  {ele}
                </TableData>
              ))}
            </tr>
          </thead>
          {!loading && <tbody className="w-full">{children}</tbody>}
        </table>
        {loading && (
          <div className="bg-white border border-[#ddd] border-t-0 p-5 flex justify-center items-center">
            <span className="loader"></span>
          </div>
        )}
        {pagenationData !== null && (
          <TableFoot pagenationData={pagenationData} next={next} prev={prev} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default Table;
