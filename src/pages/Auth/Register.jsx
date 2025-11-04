import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import FileInput from "../../components/FileInput";

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [totalRooms, setTotalRooms] = useState('');
  const [totalOwners, setTotalOwners] = useState('');
  const [commercialRegister, setCommercialRegister] = useState();
  const [taxCard, setTaxCard] = useState();
  const [licensing, setLicensing] = useState();

  const isValid = userName.length !== 0 && password.length !== 0 && name.length !== 0 && location.length !== 0 && phoneNumber.length !== 0 && email.length !== 0 && totalRooms.length !== 0 && totalOwners.length !== 0 && commercialRegister && taxCard && licensing;

  function print() {
    console.log(commercialRegister);
    console.log(taxCard);
    console.log(licensing);
  }

  console.log(isValid)

  return (
    <main className="h-screen flex justify-center items-center">
      <Card className="flex flex-col gap-5 items-center">
        <h1 className="text-center text-2xl font-medium">Create new account</h1>

        <Container title="Login Info">
          <Input title="UserName" required value={userName} setValue={setUserName} />
          <Input title="Password" required value={password} setValue={setPassword} />
        </Container>

        <Container title="Hotel Info">
          <Input title="Name" required value={name} setValue={setName} />
          <Input title="Location" required value={location} setValue={setLocation} />
          <Input title="Phone Number" required value={phoneNumber} setValue={setPhoneNumber} />
          <Input title="Email" required value={email} setValue={setEmail} />
          <Input title="Total Rooms" required value={totalRooms} setValue={setTotalRooms} />
          <Input title="Total Owners" required value={totalOwners} setValue={setTotalOwners} />
        </Container>

        <Container title="Licenses">
          <FileInput type="file" title="Commercial register" required value={commercialRegister} setValue={setCommercialRegister} />
          <FileInput type="file" title="Tax Card" required value={taxCard} setValue={setTaxCard} />
          <FileInput type="file" title="Licensing" required value={licensing} setValue={setLicensing} />
        </Container>

        <Button onClick={print} full disabled={!isValid}>
          Login
        </Button>
      </Card>
    </main>
  );
};

const Container = ({ children, title = null }) => {
  return (
    <div>
      <h2 className="font-medium mb-[10px]">{title}</h2>
      <div className="flex flex-wrap gap-5 max-w-[460px]">{children}</div>
    </div>
  );
};

export default Register;
