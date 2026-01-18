import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import TableRow from "../../components/Table/TableRow";
import TableData from "../../components/Table/TableData";
import TableLink from "../../components/Table/TableLink";
import { IoIosLink } from "react-icons/io";
import axios from "axios";
import { domain } from "../../../globals";
import api from "../../../api/axios";

const AdminDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handle = async () => {
      const { data } = await api.get("/hotels");
      setData(data.data);
    };
    handle();
  }, []);
  return (
    <main className="p-5">
      <Table
        head={["Name", "Location", "State", "Details"]}
        smallArr={["Details"]}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.hotelName}</TableData>
            <TableData>{ele.location}</TableData>
            <TableData>{ele.isActiveSubscription.toString()}</TableData>
            <TableLink link={ele._id}>
              <IoIosLink />
            </TableLink>
          </TableRow>
        ))}
      </Table>
    </main>
  );
};

export default AdminDashboard;
