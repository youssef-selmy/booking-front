import React, { useState } from "react";
import Card from "../../../../components/Card";
import InputContainer from "../../../../components/InputContainer";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import SelectMenu from "../../../../components/SelectMenu";

const Payment = () => {
  const [cost, setCost] = useState();
  const [paid, setPaid] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [state, setState] = useState();
  return (
    <Card className="flex flex-col gap-5">
      <h2 className="font-medium text-xl">Payment & Subscription</h2>
      <InputContainer>
        <Input title="Subscription Cost" value={cost} setValue={setCost} />
        <Input title="Paid" value={paid} setValue={setPaid} />
      </InputContainer>
      <InputContainer>
        <Input title="Start At" type="date" value={start} setValue={setStart} />
        <Input title="End At" type="date" value={end} setValue={setEnd} />
      </InputContainer>
        <SelectMenu title="State" value={state} setValue={setState} />
        <Button >Update</Button>
    </Card>
  );
};

export default Payment;
