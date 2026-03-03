import { useEffect, useState } from "react";
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

const toDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

const Payment = ({ data, id, onUpdated }) => {
  const [cost, setCost] = useState(data.subscriptionCost);
  const [paid, setPaid] = useState(data.paid);
  const [start, setStart] = useState(toDateInput(data.startAt));
  const [end, setEnd] = useState(toDateInput(data.endAt));
  const [state, setState] = useState(
    stateValues.find((e) => e.value === data.isActiveSubscription),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setCost(data.subscriptionCost ?? "");
    setPaid(data.paid ?? "");
    setStart(toDateInput(data.startAt));
    setEnd(toDateInput(data.endAt));
    setState(stateValues.find((e) => e.value === data.isActiveSubscription));
  }, [data]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = {
        isActiveSubscription: state?.value ?? false,
        paid: Number(paid),
        subscriptionCost: Number(cost),
        startAt: start || null,
        endAt: end || null,
      };

      const response = await api.put(`hotels/${id}`, payload);
      onUpdated?.(response.data?.data ?? { ...data, ...payload });
      setSuccess("Hotel updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update hotel.");
    } finally {
      setLoading(false);
    }
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
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-700">{success}</p>}
      <Button onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </Button>
    </Card>
  );
};

export default Payment;
