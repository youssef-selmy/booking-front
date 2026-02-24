import React, { useEffect, useState } from "react";
import Section from "../../../components/Section";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Table from "../../../components/Table/Table";
import TableRow from "../../../components/Table/TableRow";
import TableData from "../../../components/Table/TableData";
import { BiTrash } from "react-icons/bi";
import { useOutletContext } from "react-router-dom";
import ErrorsBlock from "../../../components/ErrorsBlock";
import api from "../../../../api/axios";

const Alerts = () => {
  const { data, id } = useOutletContext();
  const [alerts, setAlerts] = useState([]);
  const [alert, setAlert] = useState();
  const [erros, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data || !data.alerts) return;
    setAlerts(data.alerts);
  }, [data]);

  const handleAdd = () => {
    if (!alert) return;
    setAlerts((prev) => [...prev, alert]);
    setAlert(null);
  };
  const handleDelete = (idx) => {
    setAlerts((prev) => prev.filter((e, i) => i !== idx));
  };

  const handleSave = async () => {
    setErrors([]);
    try {
      setLoading(true);
      const res = await api.put(`reservation/${id}`, { alerts });
    } catch (error) {
      setErrors([error.response.data.message]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section extraPadding>
      <ErrorsBlock globalErrors={erros} />
      <Card className="flex gap-5 items-end">
        <Input title="Alert" value={alert} setValue={setAlert} />
        <Button onClick={handleAdd}>Add</Button>
      </Card>
      <Table loading={loading} head={["Alert", "Delete"]}>
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
      <Button className='mt-5' onClick={handleSave} full>Save</Button>
    </Section>
  );
};

export default Alerts;
