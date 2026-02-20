import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import { HiLink } from "react-icons/hi2";
import TableLink from "../../../../components/Table/TableLink";
import useTable from "../../../../../hooks/useTable";
import api from "../../../../../api/axios";

const HouseKeepingBoard = () => {
  const { data, setData, loading } = useTable("inventory/house-keeping");
  console.log(data);

  const handleFinish = async (id) => {
    try {
      const res = await api.patch(`inventory/finish/${id}`);
      setData((prev) => prev.filter((e) => e._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Section extraPadding classname="w-full px-5">
      <Table loading={loading} head={["Room", "Floor", "Finish"]}>
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.roomNumber}</TableData>
            <TableData>{ele.floor}</TableData>
            <TableData>
              <HiLink
                onClick={() => handleFinish(ele._id)}
                className="w-full cursor-pointer"
              />
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Section>
  );
};

export default HouseKeepingBoard;
