import { useState } from "react";
import Popup from "../../../../components/Popup";
import Input from "../../../../components/Input";
import Table from "../../../../components/Table/Table";
import Section from "../../../../components/Section";

const ViewPricing = () => {
  const [data, setData] = useState([
    { name: "Sea", price: 10 },
    { name: "Garden", price: 10 },
    { name: "Roof", price: 10 },
  ]);
  const [editItem, setEditItem] = useState(null);
  const [mode, setMode] = useState(null);

  return (
    <>
      <Table
        head={["Name", "Price"]}
        dataKeys={["name", "price"]}
        data={data}
        edit={true}
        setEditItem={setEditItem}
        setMode={setMode}
        showFilters
        showAdd
      />
      <Filters mode={mode} setMode={setMode} />
      <Add mode={mode} setMode={setMode} />
      <Edit mode={mode} setMode={setMode} />
    </>
  );
};

const Filters = ({ mode, setMode }) => {
  return (
    <Popup title={mode} open={mode === "Filters"} setMode={setMode}>
      <Input title="Name" />
      <Input title="Price" />
    </Popup>
  );
};

const Add = ({ mode, setMode }) => {
  return (
    <Popup title={mode} open={mode === "Add"} setMode={setMode}>
      <Input title="Name" />
      <Input title="Price" />
    </Popup>
  );
};

const Edit = ({ mode, setMode, editItem }) => {
  return (
    <Popup title={mode} open={mode === "Edit"} setMode={setMode}>
      <Input title="Name" />
      <Input title="Price" />
    </Popup>
  );
};

export default ViewPricing;
