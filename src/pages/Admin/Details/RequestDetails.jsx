import { useParams } from "react-router-dom";
import { useState } from "react";
import HotelInfo from "./components/HotelInfo";
import Licenses from "./components/Licenses";
import Payment from "./components/Payment";

const RequestDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "Hilton",
    location: "Alex",
    phoneNumber: "+20103320434",
    email: "temp@test.com",
    totalRooms: 1,
    totalOwners: 1,
  });
  return (
    <main className="p-5">
      <div className="flex gap-5 w-fit m-auto mb-5">
        <HotelInfo data={data} />
        <Licenses data={data} />
      </div>
      <div className="flex gap-5 w-fit m-auto">
        <Payment data={data} />
      </div>
    </main>
  );
};

export default RequestDetails;
