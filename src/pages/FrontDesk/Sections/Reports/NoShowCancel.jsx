import React from "react";
import ReportPage from "../../../../components/ReportPage";

const NoShowCancel = () => (
  <ReportPage
    title="No‑Show / Cancellations"
    endpoint="no-show-cancel"
    columns={[
      "Reservation #",
      "Guest Name",
      "Check‑In",
      "Status",
      "Stay Status",
      "Lost Revenue",
    ]}
    mapper={(r) => [
      r.reservationNumber,
      r.guestName,
      r.checkIn ? r.checkIn.split("T")[0] : "",
      r.status,
      r.stayStatus,
      r.lostRevenue,
    ]}
  />
);

export default NoShowCancel;
