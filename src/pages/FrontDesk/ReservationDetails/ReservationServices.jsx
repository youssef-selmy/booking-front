import React, { useEffect, useState } from "react";
import Section from "../../../components/Section";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import SelectMenu from "../../../components/SelectMenu";
import api from "../../../../api/axios";
import Button from "../../../components/Button";
import Table from "../../../components/Table/Table";
import TableRow from "../../../components/Table/TableRow";
import TableData from "../../../components/Table/TableData";
import { BiTrash } from "react-icons/bi";
import ErrorsBlock from "../../../components/ErrorsBlock";
import { useOutletContext } from "react-router-dom";

const ReservationServices = () => {
  const { data, id } = useOutletContext();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!data) return;
    setServices(data.services);
  }, [data]);

  const handleSave = async () => {
    setErrors([]);
    const newData = { services };
    try {
      setLoading(true);
      const res = await api.put(`reservation/${id}`, newData);
    } catch (error) {
      setErrors([error.response.data.message]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (ele) => {
    setServices((prev) => [...prev, ele]);
  };
  const handleDelete = (idx) => {
    setServices((prev) => prev.filter((e, i) => i !== idx));
  };
  return (
    <Section extraPadding classname="flex flex-col gap-5">
      <ErrorsBlock globalErrors={errors} />
      <TopCard handleAdd={handleAdd} />
      <DataTable
        loading={loading}
        services={services}
        handleDelete={handleDelete}
      />
      <Button disabled={loading} onClick={handleSave}>Save</Button>
    </Section>
  );
};

const TopCard = ({ handleAdd }) => {
  const [serviceOptions, setServiceOptions] = useState([]);
  const [service, setService] = useState();

  useEffect(() => {
    const handle = async () => {
      const { data } = await api.get("services");
      setServiceOptions(data.data);
    };
    handle();
  }, []);

  return (
    <Card className="flex gap-5 items-end">
      <SelectMenu
        title="Service"
        options={serviceOptions}
        value={service}
        setValue={setService}
      />
      <Input title="price" value={service?.price} readOnly />
      <Button
        disabled={!service?.name}
        onClick={() => {
          handleAdd(service);
          setService(null);
        }}
      >
        Add
      </Button>
    </Card>
  );
};

const DataTable = ({ loading, services = [], handleDelete }) => {
  return (
    <Card>
      <Table head={["Name", "Price", "Delete"]} smallArr={["Delete"]}>
        {services.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele?.name}</TableData>
            <TableData>{ele?.price}</TableData>
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
        {services.length <= 0 && (
          <>
            <TableRow rowNum={2}>
              <TableData>-</TableData>
              <TableData>-</TableData>
              <TableData>-</TableData>
            </TableRow>
            <TableRow>
              <TableData>-</TableData>
              <TableData>-</TableData>
              <TableData>-</TableData>
            </TableRow>
            <TableRow rowNum={2}>
              <TableData>-</TableData>
              <TableData>-</TableData>
              <TableData>-</TableData>
            </TableRow>
          </>
        )}
      </Table>
    </Card>
  );
};

export default ReservationServices;
