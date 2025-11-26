import { useState } from "react";
import Section from "../../components/Section";
import Table from "../../components/Table/Table";
import Card from "../../components/Card";
import Input from "../../components/Input";
import SelectMenu from "../../components/SelectMenu";
import Popup from "../../components/Popup";

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
  const [mode, setMode] = useState(null);
  const [editItem, setEditItem] = useState(null);

  return (
    <>
      <Section classname="p-5 pt-[90px] flex flex-col gap-5">
        <Table
          data={data}
          head={["UserName", "Email", "Password", "Role"]}
          dataKeys={["userName", "email", "password", "role"]}
          edit={true}
          setMode={setMode}
          setEditItem={setEditItem}
          showFilters={true}
          showAdd={true}
        />
      </Section>
      <Filters mode={mode} setMode={setMode} />
      <Add mode={mode} setMode={setMode} />
      <Edit mode={mode} setMode={setMode} editItem={editItem} />
    </>
  );
};

const Filters = ({ mode, setMode }) => {
  return (
    <Popup title={mode} setMode={setMode} open={mode === "Filters"}>
      <Input title="UserName" />
      <Input title="Email" />
      <Input title="Password" />
      <SelectMenu title="Role" />
    </Popup>
  );
};

const Add = ({ mode, setMode }) => {
  return (
    <Popup title={mode} setMode={setMode} open={mode === "Add"}>
      <Input title="UserName" />
      <Input title="Email" />
      <Input title="Password" />
      <SelectMenu title="Role" />
    </Popup>
  );
};

const Edit = ({ mode, editItem, setMode }) => {
  return (
    <Popup title={mode} setMode={setMode} open={mode === "Edit"}>
      <Input title="UserName" value={editItem?.userName} />
      <Input title="Email" value={editItem?.email} />
      <Input title="Password" value={editItem?.password} />
      <SelectMenu title="Role" value={{ id: "", name: editItem?.role }} />
    </Popup>
  );
};

export default Users;
