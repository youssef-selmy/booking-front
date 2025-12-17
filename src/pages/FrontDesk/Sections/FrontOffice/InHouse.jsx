import { useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import TableLink from "../../../../components/Table/TableLink";
import { HiLink } from "react-icons/hi2";
const InHouse = () => {
  const [data, setData] = useState([
    {
      id: "123",
      name: "Michel",
      room: "211",
      nights: 2,
      remaining: 1500,
      checkoutDate: "27-11-2025",
    },
  ]);
  return (
    <Section extraPadding classname="w-full px-5">
      <Table
        head={[
          "Name",
          "Room",
          "Nights",
          "Remaining",
          "Checkout Date",
          "Details",
        ]}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.name}</TableData>
            <TableData>{ele.room}</TableData>
            <TableData>{ele.nights}</TableData>
            <TableData>{ele.remaining}</TableData>
            <TableData>{ele.checkoutDate}</TableData>
            <TableLink
              link={`/front-desk/booking/manage-reservation/${ele.id}`}
            >
              <HiLink />
            </TableLink>
          </TableRow>
        ))}
      </Table>
    </Section>
  );
};

export default InHouse;
