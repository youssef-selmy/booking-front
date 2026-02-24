import React from "react";
import ReportPage from "../../../../components/ReportPage";

const ExpectedArrivals = () => (
  <ReportPage
    title="Expected Arrivals"
    endpoint="expected-arrivals"
    filtersConfig={[
      { name: "fromDate", label: "From", type: "date" },
      { name: "toDate", label: "To", type: "date" },
    ]}
    columns={[
      "Guest Name",
      "Reservation #",
      "Booking Source",
      "Expected Arrival",
      "Remaining Amount",
      "Room",
      "VIP Notes",
    ]}
    mapper={(r) => [
      r.guestName,
      r.reservationNumber,
      r.bookingSource,
      r.expectedArrival ? r.expectedArrival.split("T")[0] : "",
      r.remainingAmount,
      r.roomType,
      r.vipNotes,
    ]}
  />
);

export default ExpectedArrivals;
