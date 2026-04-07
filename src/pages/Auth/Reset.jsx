import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { domain } from "../../../globals";
import ErrorsBlock from "../../components/ErrorsBlock";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Reset = () => {
  const { email } = useParams();
  const decodedEmail = decodeURIComponent(email || "");
  const [newPassword, setNewPassword] = useState();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!newPassword) return;
    setErrors([]);
    try {
      const base = domain.replace(/\/+$/, "");
      const payload = {
        newPassword,
        email: decodedEmail,
      };
      const attempts = [
        { method: "post", url: `${base}/auth/resetPassword` },
        { method: "post", url: `${base}/auth/reset-password` },
        { method: "put", url: `${base}/auth/resetPassword` },
        { method: "put", url: `${base}/auth/resetpassword` },
      ];

      let lastError;
      for (const attempt of attempts) {
        try {
          await axios({
            method: attempt.method,
            url: attempt.url,
            data: payload,
          });
          lastError = null;
          break;
        } catch (err) {
          lastError = err;
        }
      }

      if (lastError) throw lastError;

      navigate(`/auth/login`);
    } catch (error) {
      setErrors([error.response?.data?.message || "Failed to reset password"]);
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
          Reset Password
        </Button>
      </Card>
    </div>
  );
};

export default Reset;
