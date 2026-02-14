import React from "react";
import Card from "../../../../../components/Card";
import Input from "../../../../../components/Input";

const Payments = ({ payment, setPayment }) => {
  return (
    <Card>
      <h2 className="text-2xl font-medium">Payments</h2>
      <div className="mt-5 flex gap-5">
        <Input title="Total" value={payment?.total} readOnly />
        <Input
          type="number"
          title="Paid"
          value={payment?.paid}
          setValue={(v) => setPayment((e) => ({ ...e, paid: v }))}
        />
        {payment?.paid ? (
          <Input
            title="Payment Method"
            value={payment?.method}
            setValue={(v) => setPayment((e) => ({ ...e, method: v }))}
          />
        ) : null}
      </div>
    </Card>
  );
};

export default Payments;
