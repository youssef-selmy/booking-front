import { useEffect, useState } from "react";
import Section from "../../../components/Section";
import Table from "../../../components/Table/Table";
import Popup from "../../../components/Popup";
import Input from "../../../components/Input";
import TableRow from "../../../components/Table/TableRow";
import TableData from "../../../components/Table/TableData";
import TableEdit from "../../../components/Table/TableEdit";

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
            "Edit",
          ]}
          setMode={setMode}
          showFilters
          showAdd
        >
          {data.map((ele, idx) => (
            <TableRow key={idx} rowNum={idx}>
              <TableData>{ele.roomNumber}</TableData>
              <TableData>{ele.floor}</TableData>
              <TableData>{ele.type}</TableData>
              <TableData>{ele.category}</TableData>
              <TableData>{ele.view}</TableData>
              <TableData>{ele.maxAdult}</TableData>
              <TableData>{ele.maxChildren}</TableData>
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
  const [item, setItem] = useState(editItem);
  useEffect(() => {
    setItem(editItem);
  }, [editItem]);
  return (
    <Popup title={mode} open={mode === "Edit"} setMode={setMode}>
      <Input
        title="Room No."
        value={item?.roomNumber}
        setValue={(v) => setItem((prev) => ({ ...prev, roomNumber: v }))}
      />
      <Input
        title="Floor"
        value={item?.floor}
        setValue={(v) => setItem((prev) => ({ ...prev, floor: v }))}
      />
      <Input
        title="Type"
        value={item?.type}
        setValue={(v) => setItem((prev) => ({ ...prev, type: v }))}
      />
      <Input
        title="Category"
        value={item?.category}
        setValue={(v) => setItem((prev) => ({ ...prev, category: v }))}
      />
      <Input
        title="View"
        value={item?.view}
        setValue={(v) => setItem((prev) => ({ ...prev, view: v }))}
      />
      <Input
        title="Max Adult"
        value={item?.maxAdult}
        setValue={(v) => setItem((prev) => ({ ...prev, maxAdult: v }))}
      />
      <Input
        title="Max Children"
        value={item?.maxChildren}
        setValue={(v) => setItem((prev) => ({ ...prev, maxChildren: v }))}
      />
    </Popup>
  );
};

export default Managment;
