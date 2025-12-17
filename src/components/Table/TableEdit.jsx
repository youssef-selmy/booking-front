import TableData from "./TableData";
import { MdModeEdit } from "react-icons/md";

const TableEdit = ({ setEditItem, setMode }) => {
  return (
    <TableData className="overflow-hidden">
      <MdModeEdit
        className="w-full cursor-pointer text-yellow-300 hover:text-yellow-500 hover:scale-125 duration-300"
        onClick={() => {
          setEditItem();
          setMode("Edit");
        }}
      />
    </TableData>
  );
};

export default TableEdit;
