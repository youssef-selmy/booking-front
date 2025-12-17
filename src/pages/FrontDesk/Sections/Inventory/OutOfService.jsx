import { useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import { HiLink } from "react-icons/hi2";
import TableLink from "../../../../components/Table/TableLink";

const OutOfService = () => {
  const [data, setData] = useState([
    {
      id: "123",
      room: "211",
      floor: "2",
      date: "27-11-2025",
      reason: "Test",
    },
  ]);
  return (
    <Section extraPadding classname="w-full px-5">
      <Table
        head={["Room", "Floor", "Date", "Reason", "Finish"]}
        smallArr={["Finish"]}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.room}</TableData>
            <TableData>{ele.floor}</TableData>
            <TableData>{ele.date}</TableData>
            <TableData>{ele.reason}</TableData>
            <TableLink>
              <HiLink />
            </TableLink>
          </TableRow>
        ))}
      </Table>
    </Section>
  );
};

export default OutOfService;
