import React, { useState } from 'react'
import Section from '../../../components/Section';
import Table from '../../../components/Table/Table';
import Popup from '../../../components/Popup';
import Input from '../../../components/Input';

const Package = () => {
    const [data, setData] = useState([
    { name: "Breakfast", price: 10 },
    { name: "Dinner", price: 10 },
    { name: "Full", price: 10 },
  ]);
  const [editItem, setEditItem] = useState(null);
  const [mode, setMode] = useState(null);

  return (
    <>
      <Section extraPadding classname="p-5 w-full">
        <Table
          head={["Name", "Price"]}
          dataKeys={['name', 'price']}
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

export default Package