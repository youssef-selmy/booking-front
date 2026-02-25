import { useEffect, useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import TableLink from "../../../../components/Table/TableLink";
import { HiLink } from "react-icons/hi2";
import ErrorsBlock from "../../../../components/ErrorsBlock";
import api from "../../../../../api/axios";
const NoShow = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const handle = async () => {
      try {
        const { data } = await api.get(`front-office/noshow`);
        setData(data.data);
      } catch (error) {
        setErrors(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    handle();
  }, []);

  return (
    <Section extraPadding classname="w-full px-5">
      <ErrorsBlock globalErrors={errors} />
      <Table
        loading={loading}
        head={[
          "Confirmation Number",
          "Main Guest Name",
          "Rooms Count",
          "Reserved Nights",
          "Total",
          "Paid",
          "Arrive Date",
          "Details",
        ]}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.confirmationNumber}</TableData>
            <TableData>{ele.mainGuestName}</TableData>
            <TableData>{ele.roomsCount}</TableData>
            <TableData>{ele.reservedNights}</TableData>
            <TableData>{ele.total}</TableData>
            <TableData>{ele.paid}</TableData>
            <TableData>{ele.arriveDate?.split("T")[0]}</TableData>
            <TableLink
              link={`/front-desk/reservation/${ele.confirmationNumber}`}
            >
              <HiLink />
            </TableLink>
          </TableRow>
        ))}
      </Table>
    </Section>
  );
};

export default NoShow;
