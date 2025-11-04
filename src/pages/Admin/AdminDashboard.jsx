import { useState } from "react";
import { Table, TableData, TableLink, TableRow } from "../../components/Table";
import { FiExternalLink } from "react-icons/fi";

const AdminDashboard = () => {
  const [data, setData] = useState([
    { id: "123", name: "Hilton", location: "Alex", state: "Pinding" },
    { id: "456", name: "H&N", location: "Cairo", state: "Pinding" },
    { id: "789", name: "Vinec", location: "Alex", state: "Pinding" },
    { id: "112", name: "Carq", location: "Alex", state: "Pinding" },
    { id: "223", name: "Finex", location: "Alex", state: "Pinding" },
  ]);
  return (
    <main className="p-5">
      <Table head={["Name", "Location", "State", "Details"]} smallArr={[4]}>
        {data.map((ele, idx) => (
          <TableRow rowNum={idx + 1} key={idx}>
            <TableData>{ele.name}</TableData>
            <TableData>{ele.location}</TableData>
            <TableData>{ele.state}</TableData>
            <TableLink link={ele.id}>
              <FiExternalLink />
            </TableLink>
          </TableRow>
        ))}
      </Table>
    </main>
  );
};

export default AdminDashboard;
