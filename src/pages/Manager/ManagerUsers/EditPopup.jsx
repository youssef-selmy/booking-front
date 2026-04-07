import { useState } from "react";
import useValidation from "../../../../hooks/useValidatoin";
import useApi from "../../../../hooks/useApi";
import api from "../../../../api/axios";
import Popup from "../../../components/Popup";
import Input from "../../../components/Input";
import SelectMenu from "../../../components/SelectMenu";
import Button from "../../../components/Button";


const EditPopup = ({ mode, setMode, editItem, setEditItem }) => {
  const [userName, setUserName] = useState(editItem.userName);
  const [email, setEmail] = useState(editItem.email);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState({ id: "", name: editItem.role });
  const [isSure, setIsSure] = useState(false);
  const { validationErrors, validateEmail, validatePassword, clearErrors } =
    useValidation();
  const { globalErrors, request, loading } = useApi((payload) =>
    api.put(`users/${editItem._id}`, payload),
  );

  const HandleUpdate = async () => {
    clearErrors();
    const formData = {
      userName,
      role: role.name,
    };
    if (email !== editItem.email) {
      const normalizedEmail = email?.trim();
      const isValid = validateEmail(normalizedEmail);
      if (!isValid) return;
      formData.email = normalizedEmail;
    }
    if (password !== "") {
      const isValid = validatePassword(password);
      if (!isValid) return;
      formData.password = password;
    }
    const { ok } = await request(formData);
    if (ok) {
      setMode(null);
      setEditItem(null);
    }
  };

  const HandleDelete = async () => {
    if(!isSure) {
        setIsSure(true);
        return;
    }
    const { data } = await api.delete(`users/${editItem._id}`);
    setMode(null);
    setEditItem(null);
  };

  return (
    <Popup
      title={mode}
      setMode={setMode}
      open={mode === "Edit"}
      globalErrors={globalErrors}
    >
      <Input title="UserName" value={userName} setValue={setUserName} />
      <Input
        title="Email"
        type="email"
        value={email}
        setValue={setEmail}
        errorMessage={validationErrors.email}
      />
      <Input title="Password" value={password} setValue={setPassword} />
      <SelectMenu
        title="Role"
        options={[
          { id: "1", name: "front_office" },
          { id: "2", name: "manager" },
        ]}
        value={role}
        setValue={setRole}
      />
      <div className="flex flex-col gap-5 w-full">
        <Button full={true} onClick={HandleUpdate} disabled={loading}>
          Update
        </Button>
        {!isSure && <Button
          full={true}
          onClick={HandleDelete}
          className="bg-red-600 hover:bg-red-700"
        >
          Delete
        </Button>}
        {isSure && <Button
          full={true}
          onClick={HandleDelete}
          className="bg-red-600 hover:bg-red-700"
        >
          [DELETE] ARE YOU SURE!!!!! [DELETE]
        </Button>}
      </div>
    </Popup>
  );
};

export default EditPopup
