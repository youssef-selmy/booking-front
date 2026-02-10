import { useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import Popup from "../../../../components/Popup";
import Input from "../../../../components/Input";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";

const Availability = () => {
  const [data, setData] = useState([
    {
      id: "123456",
      roomNumber: "123456",
      roomFloor: "Test",
      roomType: "Cop.Inc",
      roomCategory: "Deulex",
      maxAdult: "Breackfast",
      maxChildren: "Breackfast",
    },
  ]);
  const [mode, setMode] = useState(null);

  return (
    <Section extraPadding classname="px-5 w-full">
      <Table
        head={[
          "Room No.",
          "Room Floor",
          "Room Type",
          "Room Category",
          "Max Adult",
          "Max Children",
        ]}
        showFilters
        setMode={setMode}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.roomNumber}</TableData>
            <TableData>{ele.roomFloor}</TableData>
            <TableData>{ele.roomType}</TableData>
            <TableData>{ele.roomCategory}</TableData>
            <TableData>{ele.maxAdult}</TableData>
            <TableData>{ele.maxChildren}</TableData>
          </TableRow>
        ))}
      </Table>
      {/* <Filters mode={mode} setMode={setMode} /> */}
    </Section>
  );
};

const Filters = ({ mode, setMode }) => {
  return (
    <Popup open={mode === "Filters"} setMode={setMode} title="Filters">
      <Input title="Room Number" />
      <Input title="First Name" />
      <Input title="Last Name" />
      <Input title="Travel Agent" />
      <Input title="Confirmation Number" />
      <Input title="Arrive At" />
      <Input title="Departure At" />
    </Popup>
  );
};

export default Availability;
