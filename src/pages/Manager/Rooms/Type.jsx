import Section from "../../../components/Section";
import Table from "../../../components/Table/Table";
import Popup from "../../../components/Popup";
import Input from "../../../components/Input";
import TableRow from "../../../components/Table/TableRow";
import TableData from "../../../components/Table/TableData";
import TableEdit from "../../../components/Table/TableEdit";
import useTable from "../../../../hooks/useTable";
import { useState } from "react";
import Button from "../../../components/Button";
import useApi from "../../../../hooks/useApi";
import api from "../../../../api/axios";

const Type = () => {
  const {
    data,
    setData,
    loading,
    mode,
    setMode,
    setEditItem,
    editItem,
    paginationData,
    next,
    prev,
    setFilters,
  } = useTable("roomType");

  return (
    <>
      <Section extraPadding classname="p-5 w-full">
        <Table
          head={["Name", "Edit"]}
          setMode={setMode}
          loading={loading}
          pagenationData={paginationData}
          next={next}
          prev={prev}
          showFilters
          showAdd
        >
          {data.map((ele, idx) => (
            <TableRow key={idx} rowNum={idx}>
              <TableData>{ele.name}</TableData>
              <TableEdit
                setEditItem={() => setEditItem(ele)}
                setMode={setMode}
              />
            </TableRow>
          ))}
        </Table>
      </Section>
      {mode === "Filters" && (
        <Filters mode={mode} setMode={setMode} setFilters={setFilters} />
      )}
      {mode === "Add" && (
        <Add
          mode={mode}
          setMode={setMode}
          setData={setData}
          dataLength={data.length}
        />
      )}
      {mode === "Edit" && (
        <Edit
          mode={mode}
          setMode={setMode}
          editItem={editItem}
          setEditItem={setEditItem}
        />
      )}
    </>
  );
};

const Filters = ({ mode, setMode, setFilters }) => {
  const [name, setName] = useState("");
  return (
    <Popup title={mode} setMode={setMode}>
      <div className="flex">
        <Input title="Name" value={name} setValue={setName} />
      </div>
      <Button
        full
        onClick={() => {
          const obj = {};
          if (name) obj.name = name;
          setFilters(obj);
          setMode(null);
        }}
      >
        Search
      </Button>
    </Popup>
  );
};

const Add = ({ mode, setMode, setData, dataLength }) => {
  const [name, setName] = useState();
  const { globalErrors, loading, request } = useApi((payload) =>
    api.post("roomType", payload),
  );
  console.log(globalErrors);
  const handleCreate = async () => {
    const { data, ok } = await request({ name });
    if (ok) {
      if (dataLength >= 10) {
        setData((prev) => {
          const copy = [...prev];
          copy.pop();
          copy.unshift(data.data);
          return copy;
        });
      } else {
        setData((prev) => [...prev, data.data]);
      }
      setName("");
      setMode(null);
    }
  };
  return (
    <Popup title={mode} setMode={setMode} globalErrors={globalErrors}>
      <div className="flex">
        <Input title="Name" value={name} setValue={setName} />
      </div>
      <Button disabled={loading || !name} onClick={handleCreate} full>
        Create
      </Button>
    </Popup>
  );
};

const Edit = ({ mode, setMode, editItem, setEditItem }) => {
  const [name, setName] = useState(editItem.name);
  const [isSure, setIsSure] = useState(false);

  const { globalErrors, request, loading } = useApi((payload) =>
    api.put(`roomType/${editItem._id}`, payload),
  );

  const HandleDelete = async () => {
    if (!isSure) {
      setIsSure(true);
      return;
    }
    const res = await api.delete(`roomType/${editItem._id}`);
    setMode(null);
    setEditItem(null);
  };

  const handleUpdate = async () => {
    if (editItem.name === name) return;
    const { ok } = await request({ name });
    if (ok) {
      setMode(null);
      setEditItem(null);
    }
  };
  return (
    <Popup title={mode} setMode={setMode} globalErrors={globalErrors}>
      <div className="flex">
        <Input title="Name" value={name} setValue={setName} />
      </div>
      <Button
        full
        onClick={handleUpdate}
        disabled={loading || !name || editItem.name === name}
      >
        Update
      </Button>
      {!isSure && (
        <Button
          full={true}
          onClick={HandleDelete}
          className="bg-red-600 hover:bg-red-700"
        >
          Delete
        </Button>
      )}
      {isSure && (
        <Button
          full={true}
          onClick={HandleDelete}
          className="bg-red-600 hover:bg-red-700"
        >
          [DELETE] ARE YOU SURE!!!!! [DELETE]
        </Button>
      )}
    </Popup>
  );
};

export default Type;
