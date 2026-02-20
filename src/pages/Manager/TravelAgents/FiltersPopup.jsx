import Popup from "../../../components/Popup";
import Input from "../../../components/Input";
import { useState } from "react";
import Button from "../../../components/Button";

const FiltersPopup = ({ mode, setMode, setFilters }) => {
  const [userName, setUserName] = useState();
  return (
    <Popup title={mode} setMode={setMode}>
      <div className="flex flex-wrap gap-5">
        <Input title="UserName" value={userName} setValue={setUserName} />
      </div>
      <Button
        full
        onClick={() => {
          const obj = {};
          if (userName) obj.name = userName;
          setFilters(obj);
          setMode(null)
        }}
      >
        Search
      </Button>
    </Popup>
  );
};

export default FiltersPopup;
