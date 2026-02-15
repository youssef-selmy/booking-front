import { useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import Popup from "../../../../components/Popup";
import Input from "../../../../components/Input";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import TableLink from "../../../../components/Table/TableLink";
import { HiLink } from "react-icons/hi2";
import useTable from "../../../../../hooks/useTable";

const ManageReservation = () => {
  const { data, mode, setMode } = useTable("reservation");
  console.log(data)

  return (
    <Section extraPadding classname="px-5 w-full">
      <Table
        head={[
          "Confirmation Number",
          "Main Guest Name",
          "Travel Agent",
          "Rooms Count",
          "Arrive Date",
          "Reserved Nights",
          "Details",
        ]}
        showFilters
        setMode={setMode}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.confirmationNumber}</TableData>
            <TableData>{ele.mainGuestName}</TableData>
            <TableData>{ele.travelAgent}</TableData>
            <TableData>{ele.roomsCount}</TableData>
            <TableData>{ele.arriveDate?.split('T')[0]}</TableData>
            <TableData>{ele.reservedNights}</TableData>
            <TableLink link={`/front-desk/reservation/${ele.confirmationNumber}`}>
              <HiLink />
            </TableLink>
          </TableRow>
        ))}
      </Table>
      {mode === "Filters" && <Filters setMode={setMode} />}
    </Section>
  );
};

const Filters = ({ setMode }) => {
  return (
    <Popup setMode={setMode} title="Filters">
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

export default ManageReservation;
