import React from "react";
import ReportPage from "../../../../components/ReportPage";

const ReservationLedger = () => (
  <ReportPage
    title="Reservation Ledger"
    endpoint="reservation-ledger"
    columns={[
      "Reservation #",
      "Guest Name",
      "Status",
      "Stay Status",
      "Remaining Amount",
      "Nights",
      "Booking Source",
    ]}
    mapper={(r) => [
      r.reservationNumber,
      r.guestName,
      r.status,
      r.stayStatus,
      r.remainingAmount,
      r.nights,
      r.bookingSource,
    ]}
  />
);

export default ReservationLedger;
