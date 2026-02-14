import React, { useState } from "react";
import Section from "../../../components/Section";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Table from "../../../components/Table/Table";
import TableRow from "../../../components/Table/TableRow";
import TableData from "../../../components/Table/TableData";
import { BiTrash } from "react-icons/bi";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [alert, setAlert] = useState();

  const handleAdd = () => {
    if (!alert) return;
    setAlerts((prev) => [...prev, alert]);
    setAlert(null)
  };
  const handleDelete = (idx) => {
    setAlerts((prev) => prev.filter((e, i) => i !== idx));
  };
  return (
    <Section extraPadding>
      <Card className="flex gap-5 items-end">
        <Input title="Alert" value={alert} setValue={setAlert} />
        <Button onClick={handleAdd}>Add</Button>
      </Card>
      <Table head={["Alert", "Delete"]}>
        {alerts.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele}</TableData>
            <TableData>
              <p
                className="flex justify-center text-xl text-red-500 cursor-pointer hover:text-red-600 duration-300"
                onClick={() => handleDelete(idx)}
              >
                <BiTrash />
              </p>
            </TableData>
          </TableRow>
        ))}
        {alerts.length <= 0 && (
          <>
            <TableRow rowNum={2}>
              <TableData>-</TableData>
              <TableData>-</TableData>
            </TableRow>
            <TableRow>
              <TableData>-</TableData>
              <TableData>-</TableData>
            </TableRow>
            <TableRow rowNum={2}>
              <TableData>-</TableData>
              <TableData>-</TableData>
            </TableRow>
          </>
        )}
      </Table>
    </Section>
  );
};

export default Alerts;
