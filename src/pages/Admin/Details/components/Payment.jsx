import { useState } from "react";
import Card from "../../../../components/Card";
import InputContainer from "../../../../components/InputContainer";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import SelectMenu from "../../../../components/SelectMenu";
import api from "../../../../../api/axios";

const stateValues = [
  { name: "Active", value: true },
  { name: "Not Active", value: false },
];

const Payment = ({ data, id }) => {
  const [cost, setCost] = useState(data.subscriptionCost);
  const [paid, setPaid] = useState(data.paid);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [state, setState] = useState(stateValues.find(e => e.value === data.isActiveSubscription));

  const handleUpdate = async () => {
    const { data } = await api.put(`hotels/${id}`, {
      isActiveSubscription: state.value,
      paid,
      subscriptionCost: cost
    });
  };

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
      <SelectMenu
        title="State"
        options={stateValues}
        value={state}
        setValue={setState}
      />
      <Button onClick={handleUpdate}>Update</Button>
    </Card>
  );
};

export default Payment;
