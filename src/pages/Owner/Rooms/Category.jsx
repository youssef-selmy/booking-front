import React, { useState } from 'react'
import Popup from '../../../components/Popup';
import Input from '../../../components/Input';
import Table from '../../../components/Table/Table';
import Section from '../../../components/Section';

const Category = () => {
  const [data, setData] = useState([
    { name: "Standard" },
    { name: "Premium" },
    { name: "Dulxe" },
  ]);
  const [editItem, setEditItem] = useState(null);
  const [mode, setMode] = useState(null);

  return (
    <>
      <Section extraPadding classname="p-5 w-full">
        <Table
          head={["Name"]}
          dataKeys={['name']}
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
      <Input title="Name" />
    </Popup>
  );
};

const Add = ({ mode, setMode }) => {
  return (
    <Popup title={mode} open={mode === "Add"} setMode={setMode}>
      <Input title="Name" />
    </Popup>
  );
};

const Edit = ({ mode, setMode, editItem }) => {
  return (
    <Popup title={mode} open={mode === "Edit"} setMode={setMode}>
      <Input title="Name" />
    </Popup>
  );
};

export default Category