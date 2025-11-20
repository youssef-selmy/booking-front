import TableData from "./TableData";
import TableLink from "./TableLink";
import TableRow from "./TableRow";
import { FiExternalLink } from "react-icons/fi";
import { MdEditCalendar } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

const TableContent = ({
  data,
  dataKeys,
  view,
  edit,
  setEditItem,
  remove,
  setMode,
}) => {
  console.log(data);
  return (
    <tbody className="w-full">
      {data.map((ele, idx) => (
        <TableRow key={idx} rowNum={idx + 1}>
          {dataKeys.map((e, i) => (
            <TableData key={i}>{ele[e]}</TableData>
          ))}
          {view && (
            <TableLink link={ele[view.key]}>
              <FiExternalLink />
            </TableLink>
          )}
          {edit && (
            <TableData>
              <MdEditCalendar
                className="w-full cursor-pointer"
                onClick={() => {
                  setEditItem(ele);
                  setMode("Edit");
                }}
              />
            </TableData>
          )}
          {remove && (
            <TableData>
              <BsTrash />
            </TableData>
          )}
        </TableRow>
      ))}
    </tbody>
  );
};

export default TableContent;
