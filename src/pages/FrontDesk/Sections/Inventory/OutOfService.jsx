import { useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import { HiLink } from "react-icons/hi2";
import TableLink from "../../../../components/Table/TableLink";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import useTable from "../../../../../hooks/useTable";
import api from "../../../../../api/axios";
import ErrorsBlock from "../../../../components/ErrorsBlock";

const OutOfService = () => {
  const { data, setData, loading } = useTable("inventory/out-of-service");
  const [roomNumber, setRoomNumber] = useState();
  const [errors,  setErrors] = useState([]);

  const handleAdd = async () => {
    console.log(roomNumber)
    if (!roomNumber) return;
    setErrors([])
    try {
      const {data} = await api.patch(`inventory/out-of-service/${roomNumber}`);
      console.log(data)
      setData((prev) => ([...prev, data.data]));
      // setData((prev) => prev.filter((e) => e.room !== roomNumber));
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message])
    }
  };

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
      <ErrorsBlock globalErrors={errors} />
      <Card className="flex gap-5 items-end">
        <Input
          title="Room Number"
          value={roomNumber}
          setValue={setRoomNumber}
        />
        <Button onClick={handleAdd} disabled={!roomNumber}>
          Add
        </Button>
      </Card>
      <Table loading={loading} head={["Room", "Finish"]}>
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.roomNumber}</TableData>
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

export default OutOfService;
