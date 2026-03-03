import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import HotelInfo from "./components/HotelInfo";
import Licenses from "./components/Licenses";
import Payment from "./components/Payment";
import api from "../../../../api/axios";

const RequestDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHotelDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get(`hotels/${id}`);
      setData(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load hotel details."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchHotelDetails();
  }, [fetchHotelDetails]);

  return (
    <main className="p-5">
      {loading && <p>Loading...</p>}
      {!loading && error && <p className="text-red-600">{error}</p>}
      {!loading && !error && data && (
        <>
          <div className="flex gap-5 w-fit m-auto mb-5">
            <HotelInfo data={data} />
            <Licenses data={data} />
          </div>
          <div className="flex gap-5 w-fit m-auto">
            <Payment data={data} id={id} onUpdated={setData} />
          </div>
        </>
      )}
    </main>
  );
};

export default RequestDetails;
