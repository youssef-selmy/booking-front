import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HotelInfo from "./components/HotelInfo";
import Licenses from "./components/Licenses";
import Payment from "./components/Payment";
import api from "../../../../api/axios";

const RequestDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handle = async () => {
      const { data } = await api.get(`hotels/${id}`);
      setData(data.data);
      console.log(data.data);
      setLoading(false);
    };
    handle();
  }, []);

  return (
    <main className="p-5">
      {!loading && (
        <>
          <div className="flex gap-5 w-fit m-auto mb-5">
            <HotelInfo data={data} />
            <Licenses data={data} />
          </div>
          <div className="flex gap-5 w-fit m-auto">
            <Payment data={data} id={id} />
          </div>
        </>
      )}
    </main>
  );
};

export default RequestDetails;
