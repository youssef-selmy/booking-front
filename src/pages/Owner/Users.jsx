import { useEffect, useState } from "react";
import Section from "../../components/Section";
import Table from "../../components/Table/Table";
import Input from "../../components/Input";
import SelectMenu from "../../components/SelectMenu";
import Popup from "../../components/Popup";
import TableRow from "../../components/Table/TableRow";
import TableData from "../../components/Table/TableData";
import { MdModeEdit } from "react-icons/md";
import TableEdit from "../../components/Table/TableEdit";

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
          head={["UserName", "Email", "Password", "Role", "Edit"]}
          smallArr={["Edit"]}
          showFilters={true}
          showAdd={true}
        >
          {data.map((ele, idx) => (
            <TableRow key={idx} rowNum={idx}>
              <TableData>{ele.userName}</TableData>
              <TableData>{ele.email}</TableData>
              <TableData>{ele.password}</TableData>
              <TableData>{ele.role}</TableData>
              <TableEdit
                setEditItem={() => setEditItem(ele)}
                setMode={setMode}
              />
            </TableRow>
          ))}
        </Table>
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

const Edit = ({ mode, setMode, editItem }) => {
  const [item, setItem] = useState(editItem);

  useEffect(() => {
    setItem(editItem);
  }, [editItem]);
  return (
    <Popup title={mode} setMode={setMode} open={mode === "Edit"}>
      <Input
        title="UserName"
        value={item?.userName}
        setValue={(v) => setItem((prev) => ({ ...prev, userName: v }))}
      />
      <Input
        title="Email"
        value={item?.email}
        setValue={(v) => setItem((prev) => ({ ...prev, email: v }))}
      />
      <Input
        title="Password"
        value={item?.password}
        setValue={(v) => setItem((prev) => ({ ...prev, password: v }))}
      />
      <SelectMenu title="Role" value={{ id: "", name: item?.role }} />
    </Popup>
  );
};

export default Users;
