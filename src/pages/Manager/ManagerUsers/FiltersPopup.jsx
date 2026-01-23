import React from 'react'
import Popup from '../../../components/Popup';
import Input from '../../../components/Input';
import SelectMenu from '../../../components/SelectMenu';

const FiltersPopup = ({ mode, setMode, setData }) => {
  return (
    <Popup title={mode} setMode={setMode} open={mode === "Filters"}>
      <Input title="UserName" />
      <Input title="Email" />
      <Input title="Password" />
      <SelectMenu title="Role" />
    </Popup>
  );
};

export default FiltersPopup