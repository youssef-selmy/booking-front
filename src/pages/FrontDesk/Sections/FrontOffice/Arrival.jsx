import React, { useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";

const Arrival = () => {
  const [data, setData] = useState([
    {
      id: "123",
      name: "Michel",
      email: "test@test.com",
      room: "211",
      nights: "2",
      arrivalDate: "27-11-2025",
    },
  ]);
  return (
    <Section extraPadding classname='w-full px-5'>
      <Table
        head={["Name", "Email", "Room", "Nights", "Arrival Date"]}
        data={data}
        dataKeys={["name", "email", "room", "nights", "arrivalDate"]}
        view={{name: 'Details', key: 'id', customeUrl: '/front-desk/booking/manage-reservation'}}
      />
    </Section>
  );
};

export default Arrival;
