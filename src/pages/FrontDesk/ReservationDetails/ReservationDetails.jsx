import { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar";
import { Outlet, useParams } from "react-router-dom";
import api from "../../../../api/axios";

const sideData = [
  { name: "Main Info", link: "main-info" },
  { name: "Rooms", link: "rooms" },
  { name: "Services", link: "services" },
  { name: "Payments", link: "payments" },
  { name: "Alerts", link: "alerts" },
  { name: "Print", link: "print" },
];

const ReservationDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const handle = async () => {
      const { data } = await api.get(`reservation/${id}`);
      setData(data.data);
    };
    handle();
  }, []);

  return (
    <main className="w-full h-full flex">
      <SideBar data={sideData} />
      <div className="px-5 w-full">
        <Outlet context={{ data, id }} />
      </div>
    </main>
  );
};

export default ReservationDetails;
