import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import ErrorsBlock from "../../components/ErrorsBlock";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Verify = () => {
  const { email } = useParams();
  const [resetCode, setResetCode] = useState();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!resetCode) return;
    setErrors([]);
    try {
      const res = await api.post("auth/verifyResetCode", { resetCode });
      navigate(`/auth/reset/email=${email}`);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="flex flex-col w-100 gap-5">
        <h2 className="text-center text-3xl font-medium mb-5">
          Check your mail box
        </h2>
        <ErrorsBlock globalErrors={errors} />
        <Input title="Reset Code" value={resetCode} setValue={setResetCode} />
        <Button disabled={!resetCode} full onClick={handleSend}>
          Send Code
        </Button>
      </Card>
    </div>
  );
};

export default Verify;
