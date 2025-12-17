import TableData from "./TableData";
import TableLink from "./TableLink";
import TableRow from "./TableRow";
import { FiExternalLink } from "react-icons/fi";
import { MdEditCalendar } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

const TableContent = ({
  data = [],
  dataKeys,
  view = false,
  edit = false,
  reserve,
  setEditItem,
  remove = false,
  setMode,
}) => {
  console.log(view?.customeUrl)
  return (
    <tbody className="w-full">
      {data.map((ele, idx) => (
        <TableRow key={idx} rowNum={idx + 1}>
          {dataKeys.map((e, i) => (
            <TableData key={i}>{ele[e]}</TableData>
          ))}
          {view && (
            <TableLink isCustome={view?.customeUrl && true} link={view?.cutomeUrl ? view.customeUrl + '/' + ele[view.key] : ele[view.key]}>
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
          {reserve && <TableLink link=''><FiExternalLink /></TableLink>}
        </TableRow>
      ))}
    </tbody>
  );
};

export default TableContent;
