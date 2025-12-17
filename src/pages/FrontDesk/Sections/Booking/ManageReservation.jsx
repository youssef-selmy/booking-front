import { useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import Popup from "../../../../components/Popup";
import Input from "../../../../components/Input";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import TableLink from "../../../../components/Table/TableLink";
import { HiLink } from "react-icons/hi2";

const ManageReservation = () => {
  const [data, setData] = useState([
    {
      id: "123456",
      confirmationNumber: "123456",
      name: "Test",
      travelAgent: "Cop.Inc",
      roomType: "Deulex",
      package: "Breackfast",
    },
    {
      id: "123456",
      confirmationNumber: "123456",
      name: "Test",
      travelAgent: "Cop.Inc",
      roomType: "Deulex",
      package: "Breackfast",
    },
  ]);
  const [mode, setMode] = useState(null);

  return (
    <Section extraPadding classname='px-5 w-full'>
      <Table
        head={[
          "Confirmation Number",
          "Name",
          "Travel Agent",
          "Room Type",
          "Package",
          "Details"
        ]}
        showFilters
        setMode={setMode}
      >
        {data.map((ele,idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.confirmationNumber}</TableData>
            <TableData>{ele.name}</TableData>
            <TableData>{ele.travelAgent}</TableData>
            <TableData>{ele.roomType}</TableData>
            <TableData>{ele.package}</TableData>
            <TableLink link={ele.id}><HiLink /></TableLink>
          </TableRow>
        ))}
      </Table>
      <Filters mode={mode} setMode={setMode} />
    </Section>
  );
};

const Filters = ({mode, setMode}) => {
  return <Popup open={mode === 'Filters'} setMode={setMode} title="Filters">
    <Input title='Room Number' />
    <Input title='First Name' />
    <Input title='Last Name' />
    <Input title='Travel Agent' />
    <Input title='Confirmation Number' />
    <Input title='Arrive At' />
    <Input title='Departure At' />
  </Popup>
}

export default ManageReservation;
