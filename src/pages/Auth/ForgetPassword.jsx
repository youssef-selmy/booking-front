import React, { useState } from "react";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import ErrorsBlock from "../../components/ErrorsBlock";
import api from "../../../api/axios";
import useValidation from "../../../hooks/useValidatoin";

const ForgetPassword = () => {
  const [email, setEmail] = useState();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { validateEmail } = useValidation();

  const handleSend = async () => {
    if (!email) return;
    if (!validateEmail(email)) {
      setErrors(["Invalid Email"]);
      return;
    }
    setErrors([]);
    try {
      await api.post("auth/forgotPassword", { email });
      navigate(`/auth/verify/${encodeURIComponent(email)}`);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="flex flex-col w-100 gap-5">
        <h2 className="text-center text-3xl font-medium mb-5">Forget Password</h2>
        <ErrorsBlock globalErrors={errors} />
        <Input title="Email" value={email} setValue={setEmail} />
        <Button disabled={!email} full onClick={handleSend}>
          Send Code
        </Button>
      </Card>
    </div>
  );
};

export default ForgetPassword;
