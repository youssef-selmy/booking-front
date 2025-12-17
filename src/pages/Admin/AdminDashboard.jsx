import { useState } from "react";
import Table from "../../components/Table/Table";
import TableRow from "../../components/Table/TableRow";
import TableData from "../../components/Table/TableData";
import TableLink from "../../components/Table/TableLink";
import { IoIosLink } from "react-icons/io";

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
      <Table head={["Name", "Location", "State", "Details"]} smallArr={["Details"]}>
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.name}</TableData>
            <TableData>{ele.location}</TableData>
            <TableData>{ele.state}</TableData>
            <TableLink link={ele.id}>
              <IoIosLink />
            </TableLink>
          </TableRow>
        ))}
      </Table>
    </main>
  );
};

export default AdminDashboard;
