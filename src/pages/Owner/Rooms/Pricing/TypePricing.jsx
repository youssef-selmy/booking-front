import { useState } from "react";
import Popup from "../../../../components/Popup";
import Input from "../../../../components/Input";
import Table from "../../../../components/Table/Table";
import Section from "../../../../components/Section";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import TableEdit from "../../../../components/Table/TableEdit";

const TypePricing = () => {
  const [data, setData] = useState([
    { name: "Standard", price: 10 },
    { name: "Dulex", price: 10 },
    { name: "Premium", price: 10 },
  ]);
  const [editItem, setEditItem] = useState(null);
  const [mode, setMode] = useState(null);

  return (
    <>
      <Table
        head={["Name", "Price", "Edit"]}
        setMode={setMode}
        showFilters
        showAdd
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.name}</TableData>
            <TableData>{ele.price}</TableData>
            <TableEdit setEditItem={() => setEditItem(ele)} setMode={setMode} />
          </TableRow>
        ))}
      </Table>
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

export default TypePricing;
