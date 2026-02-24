import React from "react";
import ReportPage from "../../../../components/ReportPage";

const Police = () => (
  <ReportPage
    title="Police Report"
    endpoint="police"
    columns={[
      "Full Name",
      "Nationality",
      "ID Number",
      "Room #",
      "Arrival Date",
      "Departure Date",
    ]}
    mapper={(r) => [
      r.fullName,
      r.nationality,
      r.idNumber,
      r.roomNumber,
      r.arrivalDate ? r.arrivalDate.split("T")[0] : "",
      r.departureDate ? r.departureDate.split("T")[0] : "",
    ]}
  />
);

export default Police;
