import React, { useEffect, useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import TableLink from "../../../../components/Table/TableLink";
import { HiLink } from "react-icons/hi2";
import useTable from "../../../../../hooks/useTable";
import api from "../../../../../api/axios";
import ErrorsBlock from "../../../../components/ErrorsBlock";

const Arrival = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const handle = async () => {
      try {
        const { data } = await api.get(`front-office/arrivals`);
        setData(data.data);
      } catch (error) {
        setErrors(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    handle();
  }, []);

  const handleCheckIn = async (confirmationNumber) => {
    setLoading(true);
    const res = await api.patch(`front-office/${confirmationNumber}/check-in`);
    console.log(res);
    setData((prev) =>
      prev.filter((e) => e.confirmationNumber !== confirmationNumber),
    );
    setLoading(false);
  };

  return (
    <Section extraPadding classname="w-full px-5">
      <ErrorsBlock globalErrors={errors} />
      <Table
        loading={loading}
        head={[
          "Confirmation Number",
          "Main Guest Name",
          "Travel Agent",
          "Rooms Count",
          "Arrive Date",
          "Reserved Nights",
          "CheckIn",
        ]}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.confirmationNumber}</TableData>
            <TableData>{ele.mainGuestName}</TableData>
            <TableData>{ele.travelAgent}</TableData>
            <TableData>{ele.roomsCount}</TableData>
            <TableData>{ele.arriveDate?.split("T")[0]}</TableData>
            <TableData>{ele.reservedNights}</TableData>
            <TableData>
              <HiLink
                onClick={() => handleCheckIn(ele.confirmationNumber)}
                className="w-full cursor-pointer"
              />
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Section>
  );
};

export default Arrival;
