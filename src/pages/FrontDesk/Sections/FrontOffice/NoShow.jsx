import { useEffect, useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import TableLink from "../../../../components/Table/TableLink";
import { HiLink } from "react-icons/hi2";
import ErrorsBlock from "../../../../components/ErrorsBlock";
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
      <Table
        loading={loading}
        head={[
          "Confirmation Number",
          "Main Guest Name",
          "Departure Date",
          "Reserved Nights",
          "Remaining",
          "Details",
        ]}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.reservationId}</TableData>
            <TableData>{ele.name}</TableData>
            <TableData>{ele.checkoutDate?.split("T")[0]}</TableData>
            <TableData>{ele.nights}</TableData>
            <TableData>{ele.remaining}</TableData>
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

export default NoShow;
