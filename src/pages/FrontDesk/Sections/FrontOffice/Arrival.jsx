import React, { useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import TableLink from "../../../../components/Table/TableLink";
import { HiLink } from "react-icons/hi2";

const Arrival = () => {
  const [data, setData] = useState([
    {
      id: "123",
      name: "Michel",
      email: "test@test.com",
      room: "211",
      nights: "2",
      arrivalDate: "27-11-2025",
    },
  ]);
  return (
    <Section extraPadding classname="w-full px-5">
      <Table head={["Main Guest Name", "Email", "Room", "Nights", "Arrival Date", "Details"]}>
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.name}</TableData>
            <TableData>{ele.email}</TableData>
            <TableData>{ele.room}</TableData>
            <TableData>{ele.nights}</TableData>
            <TableData>{ele.arrivalDate}</TableData>
            <TableLink link={`/front-desk/booking/manage-reservation/${ele.id}`}>
              <HiLink />
            </TableLink>
          </TableRow>
        ))}
      </Table>
    </Section>
  );
};

export default Arrival;
