import React from "react";
import ReportPage from "../../../../components/ReportPage";

const NightAudit = () => (
  <ReportPage
    title="Night Audit"
    endpoint="night-audit"
    columns={["Date", "Total Reservations", "Room Revenue", "Taxes", "Net Revenue"]}
    mapper={(r) => [
      r.date ? new Date(r.date).toLocaleDateString() : "",
      r.totalReservations,
      r.roomRevenue,
      r.taxes,
      r.netRevenue,
    ]}
  />
);

export default NightAudit;

