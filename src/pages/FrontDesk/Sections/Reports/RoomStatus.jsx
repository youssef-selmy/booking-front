import React from "react";
import ReportPage from "../../../../components/ReportPage";

const RoomStatus = () => (
  <ReportPage
    title="Room Status"
    endpoint="room-status"
    columns={["Room #", "Status Code", "Last Updated", "Floor"]}
    mapper={(r) => [
      r.roomNumber,
      r.statusCode,
      r.lastUpdated ? new Date(r.lastUpdated).toLocaleString() : "",
      r.floor,
    ]}
  />
);

export default RoomStatus;
