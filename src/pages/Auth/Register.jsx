import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import FileInput from "../../components/FileInput";
import axios from "axios";
import { domain } from "../../../globals";
import { useNavigate } from "react-router-dom";
import TermsAndConditions from '../../assets/TermsAndConditions.pdf'

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [totalOwners, setTotalOwners] = useState("");
  const [services, setServices] = useState("");
  const [commercialRegister, setCommercialRegister] = useState();
  const [taxCard, setTaxCard] = useState();
  const [licensing, setLicensing] = useState();

  const isValid =
    userName.length !== 0 &&
    password.length !== 0 &&
    hotelName.length !== 0 &&
    location.length !== 0 &&
    phoneNumber.length !== 0 &&
    email.length !== 0 &&
    totalRooms.length !== 0 &&
    totalOwners.length !== 0 &&
    services.length !== 0 &&
    commercialRegister &&
    taxCard &&
    licensing;

  async function handleRegister() {
    const fromdata = new FormData();

    if (!isValid) return;

    fromdata.append("userName", userName);
    fromdata.append("hotelName", hotelName);
    fromdata.append("location", location);
    fromdata.append("totalRooms", totalRooms);
    fromdata.append("totalOnwers", totalOwners);
    fromdata.append("services", services);
    fromdata.append("email", email);
    fromdata.append("password", password);
    fromdata.append("phoneNumber", phoneNumber);
    fromdata.append("CommercialRegister", commercialRegister);
    fromdata.append("taxCard", taxCard);
    fromdata.append("Licensing", licensing);

    try {
      setLoading(true);
      const { data } = await axios.post(`${domain}/auth/signup`, fromdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/", { replace: true });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-screen flex justify-center items-center">
      <Card className="flex flex-col gap-5 items-center">
        <h1 className="text-center text-2xl font-medium">Create new account</h1>

        <Container title="Login Info">
          <Input
            title="User Name"
            required
            value={userName}
            setValue={setUserName}
          />
          <Input title="Email" required value={email} setValue={setEmail} />
          <Input
            title="Password"
            required
            value={password}
            setValue={setPassword}
          />
        </Container>

        <Container title="Hotel Info">
          <Input
            title="Hotel Name"
            required
            value={hotelName}
            setValue={setHotelName}
          />
          <Input
            title="Location"
            required
            value={location}
            setValue={setLocation}
          />
          <Input
            title="Phone Number"
            required
            value={phoneNumber}
            setValue={setPhoneNumber}
          />
          <Input
            title="Total Rooms"
            required
            value={totalRooms}
            setValue={setTotalRooms}
          />
          <Input
            title="Total Owners"
            required
            value={totalOwners}
            setValue={setTotalOwners}
          />
          <Input
            title="Services"
            required
            value={services}
            setValue={setServices}
          />
        </Container>

        <Container title="Licenses">
          <FileInput
            type="file"
            title="Commercial register"
            required
            value={commercialRegister}
            setValue={setCommercialRegister}
          />
          <FileInput
            type="file"
            title="Tax Card"
            required
            value={taxCard}
            setValue={setTaxCard}
          />
          <FileInput
            type="file"
            title="Licensing"
            required
            value={licensing}
            setValue={setLicensing}
          />
        </Container>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="w-5 h-5 accent-blue-600"
          />
          <span className="text-gray-700 text-base">
            I have read and agree to the{" "}
            <a
              href={TermsAndConditions}
              download
              className="underline text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Terms & Conditions
            </a>
            .
          </span>
        </label>

        <Button onClick={handleRegister} full disabled={!agreed || !isValid || loading}>
          Send Request
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
