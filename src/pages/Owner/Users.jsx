import { useState } from "react";
import Section from "../../components/Section";
import Table from "../../components/Table/Table";

const Users = () => {
  const [data, setData] = useState([
    {
      userName: "mahmoud",
      password: "aA12345678",
      email: "gm79ds793@gmail.com",
      role: "front_office",
    },
    {
      userName: "mahmoud",
      password: "aA12345678",
      email: "gm79ds793@gmail.com",
      role: "front_office",
    },
    {
      userName: "mahmoud",
      password: "aA12345678",
      email: "gm79ds793@gmail.com",
      role: "front_office",
    },
  ]);

  return (
    <Section classname="p-5 pt-[90px] flex flex-col gap-5">
      <Table
        data={data}
        head={["UserName", "Email", "Password", "Role"]}
        dataKeys={["userName", "email", "password", "role"]}
      />
    </Section>
  );
};

export default Users;
