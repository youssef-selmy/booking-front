import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import ErrorsBlock from "../../components/ErrorsBlock";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Reset = () => {
  const { email } = useParams();
  const [newPassword, setNewPassword] = useState();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!newPassword) return;
    setErrors([]);
    try {
      const res = await api.post("auth/resetPassword", { newPassword, email });
      navigate(`/auth/login`);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="flex flex-col w-100 gap-5">
        <h2 className="text-center text-3xl font-medium mb-5">
          Enter Your New Password
        </h2>
        <ErrorsBlock globalErrors={errors} />
        <Input
          title="New Password"
          value={newPassword}
          setValue={setNewPassword}
        />
        <Button disabled={!newPassword} full onClick={handleSend}>
          Send Code
        </Button>
      </Card>
    </div>
  );
};

export default Reset;
