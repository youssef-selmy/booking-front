import React from "react";
import ReportPage from "../../../components/ReportPage";

const ManagerFlash = () => (
  <ReportPage
    title="Manager Flash Report"
    endpoint="manager-flash"
    filtersConfig={[{ name: "date", label: "Date", type: "date" }]}
    columns={[
      "Date",
      "Rooms Available",
      "Rooms Sold",
      "Total Revenue",
      "Occupancy %",
      "ADR",
      "RevPAR",
    ]}
    mapper={(r) => [
      r.date ? new Date(r.date).toLocaleDateString() : "",
      r.roomsAvailable,
      r.roomsSold,
      r.totalRoomRevenue,
      r.occupancy,
      r.ADR,
      r.RevPAR,
    ]}
  />
);

export default ManagerFlash;
