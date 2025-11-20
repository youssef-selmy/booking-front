import TableFoot from "./TableFoot";
import TableContent from "./TableContent";
import TableData from "./TableData";

const Table = ({
  head = [],
  smallArr = [],
  dataKeys = [],
  data = [],
  isPagenated = false,
  pagenationData,
  next,
  prev,
  loading = false,
  view = null,
  edit = null,
  remove = null,
  reserve = null,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <table className="w-full bg-white border border-[#ddd] rounded-2xl">
          <thead className="w-full bg-[#333] text-white font-medium text-lg">
            <tr>
              {head.map((ele, idx) => (
                <TableData key={idx} small={smallArr.includes(idx + 1)}>
                  {ele}
                </TableData>
              ))}
              {view && <TableData small>{view.name}</TableData>}
              {edit && <TableData small>Edit</TableData>}
              {remove && <TableData small>Delete</TableData>}
              {reserve && <TableData small>Reserve</TableData>}
            </tr>
          </thead>
          {!loading && (
            <TableContent
              data={data}
              dataKeys={dataKeys}
              view={view}
              edit={edit}
              remove={remove}
            />
          )}
        </table>
        {loading && (
          <div className="bg-white border border-[#ddd] border-t-0 p-5 flex justify-center items-center">
            Loading...
          </div>
        )}
        {isPagenated && (
          <TableFoot pagenationData={pagenationData} next={next} prev={prev} />
        )}
      </div>
    </div>
  );
};

export default Table;
