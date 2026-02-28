import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Section from "../../../components/Section";
import Button from "../../../components/Button";
import api from "../../../../api/axios";

const TermsAndConditions = () => {
  const [printTerms, setPrintTerms] = useState("");
  const [editing, setEditing] = useState(false);
  const [tempTerms, setTempTerms] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("settings/terms");
      setPrintTerms(data.data?.printTerms || "");
    } catch (error) {
      console.error("Error fetching terms:", error);
      if (error.response?.status === 404) setPrintTerms("");
      else
        setMessage(
          error.response?.data?.message ||
            "Error loading terms, please try again later."
        );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setTempTerms(printTerms);
    setEditing(true);
    setMessage("");
  };

  const handleCancel = () => {
    setEditing(false);
    setTempTerms("");
    setMessage("");
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let result;
      try {
        result = await api.put("settings/terms", { printTerms: tempTerms });
      } catch (innerErr) {
        if (innerErr.response?.status === 404) {
          result = await api.post("settings/terms", { printTerms: tempTerms });
        } else throw innerErr;
      }
      setPrintTerms(tempTerms);
      setEditing(false);
      setMessage("Terms and Conditions updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("save terms error", error);
      setMessage(
        error.response?.data?.message || error.message || 
        "Error saving terms and conditions"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section extraPadding classname="px-5 w-full">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* ================= Tabs ================= */}
        <div className="flex gap-4 border-b mb-6">
          <NavLink
            to="."
            end
            className={({ isActive }) =>
              `pb-2 ${
                isActive
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            Terms & Conditions
          </NavLink>

          <NavLink
            to="recommendation"
            className={({ isActive }) =>
              `pb-2 ${
                isActive
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            AI Recommendation
          </NavLink>
        </div>

        {/* ================= Tab Content ================= */}
        <Outlet />

        {/* ================= Terms Content (default) ================= */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Print Page Terms & Conditions
          </h2>

          {!editing ? (
            <div>
              <div className="bg-gray-50 p-4 rounded mb-4 min-h-[200px] whitespace-pre-wrap border border-gray-200">
                {printTerms || "No terms and conditions set yet"}
              </div>
              <Button onClick={handleEdit} disabled={loading}>
                Edit
              </Button>
            </div>
          ) : (
            <div>
              <textarea
                className="w-full p-3 border border-gray-300 rounded mb-4 font-sans"
                rows="10"
                value={tempTerms}
                onChange={(e) => setTempTerms(e.target.value)}
                placeholder="Enter terms and conditions..."
              />
              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button
                  onClick={handleCancel}
                  disabled={loading}
                  className="bg-gray-500 hover:bg-gray-600"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Info</h3>
          <p className="text-sm text-blue-800">
            These terms and conditions will be displayed in the guest
            registration card print page.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default TermsAndConditions;