import { useEffect, useState } from "react";

const CurrencyCalculator = () => {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("EGP");
  const [to, setTo] = useState("USD");
  const [rate, setRate] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencies = [
    { code: "EGP", name: "Egyptian Pound" },
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "AED", name: "UAE Dirham" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CAD", name: "Canadian Dollar" },
  ];

  const fetchRate = async () => {
    if (!amount) return;

    try {
      setLoading(true);

      const res = await fetch(
        `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`,
      );
      const data = await res.json();

      if (!data || !data.result || !data.info) {
        console.error("Invalid response from API", data);
        setRate(null);
        setResult(null);
        return;
      }

      setRate(data.info.rate);
      setResult(data.result);
    } catch (err) {
      console.error("Error fetching rate:", err);
      setRate(null);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRate();
  }, [from, to, amount]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="w-full max-w-[500px] max-h-[500px] bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-center mb-6">
          Currency Converter
        </h2>

        <div className="space-y-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />

          <div className="flex items-center gap-3">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.code}
                </option>
              ))}
            </select>

            <span className="text-xl font-semibold">→</span>

            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 text-center">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : result ? (
            <>
              <p className="text-sm text-gray-500 mb-2">
                1 {from} = {rate?.toFixed(4)} {to}
              </p>
              <h3 className="text-xl font-semibold">
                {amount} {from} ={" "}
                <span className="text-blue-600">
                  {result?.toFixed(2)} {to}
                </span>
              </h3>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CurrencyCalculator;
