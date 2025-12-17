import { Link } from "react-router-dom";
import TableData from "./TableData";

const TableLink = ({ children, link }) => {
  return (
    <TableData small className="overflow-hidden">
      <div className="flex justify-center hover:scale-125 duration-300 cursor-pointer">
        <Link className="w-full flex justify-center" to={link}>{children}</Link>
      </div>
    </TableData>
  );
};

export default TableLink