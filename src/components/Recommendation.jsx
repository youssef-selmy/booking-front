import React, { useEffect, useState } from "react";
import Section from "./Section";
// axios instance lives in project root `api/axios.js`
// relative from components/* means we need to go up two levels
import api from "../../api/axios";

// displays a one‑line recommendation from the back‑end
const Recommendation = () => {
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendation = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("front-office/recommendation");
      if (data?.status === "success") {
        setRecommendation(data.recommendation);
      } else {
        setError(data?.message || "unexpected response");
      }
    } catch (err) {
      setError(err.message || "network error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendation();
  }, []);

  return (
    <Section classname="w-full p-5">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-medium">Front‑desk tip</h2>
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={fetchRecommendation}
          disabled={loading}
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {loading && <p>Generating recommendation…</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && recommendation && (
        <p className="whitespace-pre-line">{recommendation}</p>
      )}
    </Section>
  );
};

export default Recommendation;
