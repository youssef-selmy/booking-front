import Popup from "../../../components/Popup";
import Input from "../../../components/Input";
import SelectMenu from "../../../components/SelectMenu";
import { useState } from "react";
import Button from "../../../components/Button";

const FiltersPopup = ({ mode, setMode, setFilters }) => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  return (
    <Popup title={mode} setMode={setMode}>
      <div className="flex flex-wrap gap-5">
        <Input title="UserName" value={userName} setValue={setUserName} />
        <Input title="Email" value={email} setValue={setEmail} />
        <SelectMenu
          title="Role"
          options={[
            { id: "0", name: "All" },
            { id: "1", name: "front_office" },
            { id: "2", name: "manager" },
          ]}
          value={role || { id: "0", name: "All" }}
          setValue={setRole}
        />
      </div>
      <Button
        full
        onClick={() => {
          const obj = {};
          if (userName) obj.userName = userName;
          if (email) obj.email = email;
          if (role) obj.role = role.name;
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
