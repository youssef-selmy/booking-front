import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Card from "../../components/Card";
import axios from "axios";
import { domain } from "../../../globals";
import { useAuth } from "../../../store/AuthProvider";
import ErrorsBlock from "../../components/ErrorsBlock";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([])

  async function handleLogin() {
    const creds = { email, password };
    try {
      setErrors([]);
      setLoading(true);
      const { data } = await axios.post(`${domain}/auth/login`, creds);
      const result = await login(data.token);
      if (result?.inactiveSubscription) {
        setErrors([
          "Subscription is not active. PMS access is blocked until subscription activation.",
        ]);
      } else if (result && !result.ok) {
        setErrors([result.error || "Login failed."]);
      }
    } catch (error) {
      setErrors([error.response.data.message])
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="h-screen flex justify-center items-center">
      <Card className="flex flex-col gap-5 items-center">
        <h1 className="text-center text-2xl font-medium">Welcom Back</h1>
        <ErrorsBlock  globalErrors={errors}/>
        <div className="flex gap-5">
          <Input
            title="Email"
            type="email"
            value={email}
            setValue={setEmail}
            required
          />
          <Input
            title="Password"
            type="password"
            value={password}
            setValue={setPassword}
            required
          />
        </div>
        <div className="flex justify-between w-full">
          <Link
            to="/auth/register"
            className="text-stone-700 hover:underline w-fit underline"
          >
            Create new account
          </Link>
          <Link
            to="/auth/forget-password"
            className="text-stone-700 hover:underline w-fit underline"
          >
            Forget Password
          </Link>
        </div>
        <Button onClick={handleLogin} full disabled={loading || !email || !password}>
          Login
        </Button>
      </Card>
    </main>
  );
};

export default Login;
