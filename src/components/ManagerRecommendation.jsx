import React, { useEffect, useState } from "react";
import Section from "./Section";
import api from "../../api/axios";

const ManagerRecommendation = () => {
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendation = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post(
        "front-office/manager-recommendation"
      );

      if (data?.status === "success") {
        setRecommendation(data.recommendation);
      } else {
        setError(data?.message || "Unexpected response");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendation();
  }, []);

  return (
    <Section classname="w-full p-5">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-medium">
          Manager Insights
        </h2>

        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={fetchRecommendation}
          disabled={loading}
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {loading && <p>Generating manager insights…</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && recommendation && (
        <p className="whitespace-pre-line">{recommendation}</p>
      )}
    </Section>
  );
};

export default ManagerRecommendation;