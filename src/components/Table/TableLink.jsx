import { Link } from "react-router-dom";
import TableData from "./TableData";

const TableLink = ({ children, link }) => {
  return (
    <TableData small>
      <div className="flex justify-center">
        <Link to={link}>{children}</Link>
      </div>
    </TableData>
  );
};

export default TableLink