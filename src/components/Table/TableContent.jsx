import TableData from "./TableData";
import TableLink from "./TableLink";
import TableRow from "./TableRow";
import { FiExternalLink } from "react-icons/fi";

const TableContent = ({ loading, data, dataKeys, view }) => {
  console.log(data);
  return (
    <tbody className="w-full">
      {data.length <= 0 && (
        <>
          <EmptyRow dataKeys={dataKeys} rowNum={1} />
          <EmptyRow dataKeys={dataKeys} rowNum={2} />
          <EmptyRow dataKeys={dataKeys} rowNum={1} />
          <EmptyRow dataKeys={dataKeys} rowNum={2} />
          <EmptyRow dataKeys={dataKeys} rowNum={1} />
        </>
      )}
      {!loading &&
        data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx + 1}>
            {dataKeys.map((e, i) => (
              <TableData key={i}>{ele[e]}</TableData>
            ))}
            {view && <TableLink link={ele[view.key]}><FiExternalLink /></TableLink>}
          </TableRow>
        ))}
    </tbody>
  );
};

const EmptyRow = ({ dataKeys, rowNum }) => {
  return (
    <TableRow rowNum={rowNum}>
      {dataKeys.map((ele, idx) => (
        <TableData key={idx}>-</TableData>
      ))}
    </TableRow>
  );
};

export default TableContent;
