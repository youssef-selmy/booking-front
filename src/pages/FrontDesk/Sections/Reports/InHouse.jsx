import React from "react";
import ReportPage from "../../../../components/ReportPage";

const InHouseReport = () => (
  <ReportPage
    title="In‑House Guests"
    endpoint="in-house"
    columns={[
      "Guest Name",
      "Room #",
      "ID Number",
      "Nationality",
      "Arrival Date",
      "Departure Date",
      "Paid Amount",
    ]}
    mapper={(r) => [
      r.guestName,
      r.roomNumber,
      r.idNumber,
      r.nationality,
      r.arrivalDate ? r.arrivalDate.split("T")[0] : "",
      r.departureDate ? r.departureDate.split("T")[0] : "",
      r.paidAmount,
    ]}
  />
);

export default InHouseReport;
