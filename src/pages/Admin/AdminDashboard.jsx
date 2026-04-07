import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import TableRow from "../../components/Table/TableRow";
import TableData from "../../components/Table/TableData";
import TableLink from "../../components/Table/TableLink";
import { IoIosLink } from "react-icons/io";
import api from "../../../api/axios";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllHotels = async () => {
      try {
        setLoading(true);
        const response = await api.get("hotels");
        setData(response.data?.data || []);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllHotels();
  }, []);

  return (
    <main className="p-5">
      <Table
        head={["Name", "Location", "State", "Details"]}
        smallArr={["Details"]}
        loading={loading}
      >
        {data.map((ele, idx) => (
          <TableRow key={ele._id || idx} rowNum={idx}>
            <TableData>{ele.hotelName}</TableData>
            <TableData>{ele.location}</TableData>
            <TableData>{ele.isActiveSubscription ? "Active" : "Not Active"}</TableData>
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
