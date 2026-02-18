import React, { useEffect } from "react";
import Section from "../../../components/Section";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Table from "../../../components/Table/Table";
import TableRow from "../../../components/Table/TableRow";
import TableData from "../../../components/Table/TableData";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useOutletContext } from "react-router-dom";
import api from "../../../../api/axios";
import ErrorsBlock from "../../../components/ErrorsBlock";

const Payments = () => {
  const { data, id } = useOutletContext();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    paid: 0,
    total: 0,
    remaining: 0,
    services: 0,
    totalRooms: 0,
  });

  const handleSave = async () => {
    setErrors([]);
    const newData = { payments };
    console.log(newData);
    try {
      setLoading(true);
      const res = await api.put(`reservation/${id}`, newData);
      console.log(res);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      setErrors([error.response.data.message]);
    } finally {
      setLoading(false);
    }
  };
  console.log(payments);

  useEffect(() => {
    if (!data) return;
    setPayments(
      data.payments.map((e) => ({ ...e, date: e.date.split("T")[0] })),
    );
  },[data])

  useEffect(() => {
    if (!data) return;
    console.log('call')
    console.log(data)

    const services = data.services.reduce((sum, current) => {
      return sum + current.price;
    }, 0);
    const paid = payments.reduce((sum, current) => {
      return sum + current.amount;
    }, 0);
    const totalRooms = data.rooms.reduce((sum, current) => {
      return sum + +current.perDay * +current.nights;
    }, 0);
    const totalPackages = data.rooms.reduce((sum, current) => {
      return sum + (current.package?.price ?? 0)
    }, 0);

    setPaymentDetails({
      paid,
      total: totalRooms + services + totalPackages,
      remaining: totalRooms + services + totalPackages - paid,
      services,
      totalRooms,
      totalPackages
    });
  }, [data, payments.length]);

  const handleAdd = (data) => {
    data.date = new Date().toISOString().split("T")[0];
    console.log(data);
    setPayments((prev) => [...prev, data]);
  };
  const handleDelete = (idx) => {
    setPayments((prev) => prev.filter((e, i) => i !== idx));
  };
  return (
    <Section extraPadding classname="flex flex-col gap-5">
      <ErrorsBlock globalErrors={errors} />
      <div className="flex gap-5">
        <Card className="flex gap-5">
          <Input
            type="number"
            value={paymentDetails.services}
            title="Total Services"
            readOnly
          />
          <Input
            type="number"
            value={paymentDetails.totalRooms}
            title="Total Rooms Price"
            readOnly
          />
          <Input
            type="number"
            value={paymentDetails.totalPackages}
            title="Total Packages Price"
            readOnly
          />
        </Card>

        <Card className="flex gap-5">
          <Input
            type="number"
            value={paymentDetails.total}
            title="Total"
            readOnly
          />
          <Input
            type="number"
            value={paymentDetails.paid}
            title="Paid"
            readOnly
          />
          <Input
            type="number"
            value={paymentDetails.remaining}
            title="Remaining"
            readOnly
          />
        </Card>
      </div>
      <PayTable
        payments={payments}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
      />
      <Button disabled={loading} onClick={handleSave}>
        Save
      </Button>
    </Section>
  );
};

const PayTable = ({ payments = [], handleAdd, handleDelete }) => {
  const [payment, setPayment] = useState({ amount: "", method: "" });
  return (
    <div className="flex flex-col gap-5">
      <Card className="flex gap-5 items-end">
        <Input
          title="Amount"
          value={payment?.amount}
          setValue={(v) => setPayment((e) => ({ ...e, amount: +v }))}
        />
        <Input
          title="Method"
          value={payment?.method}
          setValue={(v) => setPayment((e) => ({ ...e, method: v }))}
        />
        <Button
          disabled={!payment?.amount || !payment?.method}
          onClick={() => {
            handleAdd(payment);
            setPayment(null);
          }}
        >
          Add
        </Button>
      </Card>
      <Card>
        <Table head={["Amount", "Method", "Date", "Delete"]}>
          {payments.map((ele, idx) => (
            <TableRow key={idx} rowNum={idx}>
              <TableData>{ele.amount}</TableData>
              <TableData>{ele.method}</TableData>
              <TableData>{ele.date}</TableData>
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
          {payments.length <= 0 && (
            <>
              <TableRow rowNum={2}>
                <TableData>-</TableData>
                <TableData>-</TableData>
                <TableData>-</TableData>
                <TableData>-</TableData>
              </TableRow>
              <TableRow>
                <TableData>-</TableData>
                <TableData>-</TableData>
                <TableData>-</TableData>
                <TableData>-</TableData>
              </TableRow>
              <TableRow rowNum={2}>
                <TableData>-</TableData>
                <TableData>-</TableData>
                <TableData>-</TableData>
                <TableData>-</TableData>
              </TableRow>
            </>
          )}
        </Table>
      </Card>
    </div>
  );
};

export default Payments;
