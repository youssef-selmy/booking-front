import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { jwtDecode } from "jwt-decode";
import Input from "../../components/Input";
import Card from "../../components/Card";

const Subscription = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const handle = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token);

      const hotelId = decoded.hotel;

      const { data } = await api.get(`hotels/${hotelId}`);
      console.log(data);
      setData(data.data);
    };

    handle();
  }, []);

  return (
    <div className="p-5 flex justify-center items-center h-screen">
      <Card className="flex flex-col gap-5">
        <div className="flex gap-5">
          <Input
            title="Subscription Cost"
            value={data.subscriptionCost}
            readOnly
          />
          <Input title="Paid" value={data.paid} readOnly />
        </div>
        <div className="flex gap-5">
          <Input type="date" title="Starts At" value={data.endsAt} readOnly />
          <Input type="date" title="Ends At" value={data.startsAt} readOnly />
        </div>
      </Card>
    </div>
  );
};

export default Subscription;
