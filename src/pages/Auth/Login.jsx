import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Card from "../../components/Card";

const Login = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  function print() {
    console.log(userName, password);
  }
  return (
    <main className="h-screen flex justify-center items-center">
      <Card className="flex flex-col gap-5 items-center">
        <h1 className="text-center text-2xl font-medium">Welcom Back</h1>
        <div className="flex gap-5">
          <Input
            title="Email"
            value={userName}
            setValue={setUserName}
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
        <Button onClick={print} full disabled={!userName || !password}>
          Login
        </Button>
      </Card>
    </main>
  );
};

export default Login;
