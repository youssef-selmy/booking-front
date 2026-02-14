import React from "react";
import Section from "../../../components/Section";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Table from "../../../components/Table/Table";
import TableRow from "../../../components/Table/TableRow";
import TableData from "../../../components/Table/TableData";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const handleAdd = (data) => {
    data.date = new Date().toLocaleDateString("en-GB").split("/").join("-");
    console.log(data);
    setPayments((prev) => [...prev, data]);
  };
  const handleDelete = (idx) => {};
  return (
    <Section extraPadding classname="flex flex-col gap-5">
      <div className="flex gap-5">
        <Card className="flex gap-5 w-full">
          <Input title="Total Services" readOnly />
          <Input title="Total Rooms Price" readOnly />
        </Card>

        <Card className="flex gap-5 w-full">
          <Input title="Total" readOnly />
          <Input title="Paid" readOnly />
          <Input title="Remaining" readOnly />
        </Card>
      </div>
      <PayTable
        payments={payments}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
      />
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
          setValue={(v) => setPayment((e) => ({ ...e, amount: v }))}
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
