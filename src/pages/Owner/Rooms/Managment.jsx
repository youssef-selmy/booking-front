import { useState } from "react";
import Section from "../../../components/Section";
import Table from "../../../components/Table/Table";
import Popup from "../../../components/Popup";
import Input from "../../../components/Input";

const Managment = () => {
  const [data, setData] = useState([
    {
      roomNumber: "001",
      floor: "1",
      type: "Single",
      category: "Standard",
      view: "Sea",
      maxAdult: "2",
      maxChildren: "0",
    },
    {
      roomNumber: "002",
      floor: "1",
      type: "Double",
      category: "Delux",
      view: "Garden",
      maxAdult: "2",
      maxChildren: "2",
    },
    {
      roomNumber: "003",
      floor: "1",
      type: "Double",
      category: "Delux",
      view: "Garden",
      maxAdult: "3",
      maxChildren: "0",
    },
  ]);
  const [editItem, setEditItem] = useState(null);
  const [mode, setMode] = useState(null);

  return (
    <>
      <Section extraPadding classname="p-5 w-full">
        <Table
          head={[
            "Room No.",
            "Floor",
            "Type",
            "Category",
            "View",
            "Max Adult",
            "Max Children",
          ]}
          dataKeys={[
            "roomNumber",
            "floor",
            "type",
            "category",
            "view",
            "maxAdult",
            "maxChildren",
          ]}
          data={data}
          edit={true}
          setEditItem={setEditItem}
          setMode={setMode}
          showFilters
          showAdd
        />
      </Section>
      <Filters mode={mode} setMode={setMode} />
      <Add mode={mode} setMode={setMode} />
      <Edit mode={mode} setMode={setMode} />
    </>
  );
};

const Filters = ({ mode, setMode }) => {
  return (
    <Popup title={mode} open={mode === "Filters"} setMode={setMode}>
      <Input title="Room No." />
      <Input title="Floor" />
      <Input title="Type" />
      <Input title="Category" />
      <Input title="View" />
      <Input title="Max Adult" />
      <Input title="Max Children" />
    </Popup>
  );
};

const Add = ({ mode, setMode }) => {
  return (
    <Popup title={mode} open={mode === "Add"} setMode={setMode}>
      <Input title="Room No." />
      <Input title="Floor" />
      <Input title="Type" />
      <Input title="Category" />
      <Input title="View" />
      <Input title="Max Adult" />
      <Input title="Max Children" />
    </Popup>
  );
};

const Edit = ({ mode, setMode, editItem }) => {
  return (
    <Popup title={mode} open={mode === "Edit"} setMode={setMode}>
      <Input title="Room No." />
      <Input title="Floor" />
      <Input title="Type" />
      <Input title="Category" />
      <Input title="View" />
      <Input title="Max Adult" />
      <Input title="Max Children" />
    </Popup>
  );
};

export default Managment;
