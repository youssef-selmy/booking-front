import Table from "../../components/Table/Table";
import TableRow from "../../components/Table/TableRow";
import TableData from "../../components/Table/TableData";
import TableLink from "../../components/Table/TableLink";
import { IoIosLink } from "react-icons/io";
import useTable from "../../../hooks/useTable";

const AdminDashboard = () => {
  const { data, loading, paginationData, next, prev } = useTable("hotels");
  return (
    <main className="p-5">
      <Table
        head={["Name", "Location", "State", "Details"]}
        smallArr={["Details"]}
        pagenationData={paginationData}
        next={next}
        prev={prev}
        loading={loading}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
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
