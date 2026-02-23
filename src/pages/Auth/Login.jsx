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

  async function handleLogin(role) {
    if (role) {
      if (role === "admin") {
        const creds = { email: "admin@gmail.com", password: "admin123456" };
        const { data } = await axios.post(`${domain}/auth/login`, creds);
        login(data.token);
        return;
      } else if (role === "manager") {
        const creds = { email: "test123@gmail.com", password: "test123" };
        const { data } = await axios.post(`${domain}/auth/login`, creds);
        login(data.token);
        return;
      }
    }
    const creds = { email, password };
    try {
      setErrors([]);
      setLoading(true);
      const { data } = await axios.post(`${domain}/auth/login`, creds);
      login(data.token);
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
            className="text-stone-700 hover:underline w-fit"
          >
            Create new account
          </Link>
          <Link
            to="/auth/forget-password"
            className="text-stone-700 hover:underline w-fit"
          >
            Forget Password
          </Link>
        </div>
        <Button onClick={handleLogin} full disabled={loading || !email || !password}>
          Login
        </Button>
        <div className="flex gap-5">
          <button
            className="bg-slate-300 px-5 py-2 cursor-pointer rounded"
            onClick={() => handleLogin("admin")}
          >
            Admin Login
          </button>
          <button
            className="bg-slate-300 px-5 py-2 cursor-pointer rounded"
            onClick={() => handleLogin("manager")}
          >
            Manager Login
          </button>
        </div>
      </Card>
    </main>
  );
};

export default Login;
