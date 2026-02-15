import { useEffect, useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import TableLink from "../../../../components/Table/TableLink";
import { HiLink } from "react-icons/hi2";
import ErrorsBlock from "../../../../components/ErrorsBlock";
import api from "../../../../../api/axios";

const Departure = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const handle = async () => {
      try {
        const { data } = await api.get(`front-office/departures`);
        console.log(data);
        setData(data.data);
      } catch (error) {
        console.log(error);
        setErrors(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    handle();
  }, []);

  const handleCheckOut = async (confirmationNumber) => {
    setErrors([])
    setLoading(true);
    try {
      const res = await api.patch(
        `front-office/${confirmationNumber}/check-out`,
      );
      console.log(res);
      setData((prev) =>
        prev.filter((e) => e.confirmationNumber !== confirmationNumber),
      );
    } catch (error) {
      setErrors([error.response.data.message]);
    } finally {
      setLoading(false);
    }
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
          "Departure Date",
          "Reserved Nights",
          "CheckOut",
        ]}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.confirmationNumber}</TableData>
            <TableData>{ele.mainGuestName}</TableData>
            <TableData>{ele.travelAgent}</TableData>
            <TableData>{ele.roomsCount}</TableData>
            <TableData>{ele.departureDate?.split("T")[0]}</TableData>
            <TableData>{ele.reservedNights}</TableData>
            <TableData>
              <HiLink
                onClick={() => handleCheckOut(ele.confirmationNumber)}
                className="w-full cursor-pointer"
              />
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Section>
  );
};

export default Departure;
