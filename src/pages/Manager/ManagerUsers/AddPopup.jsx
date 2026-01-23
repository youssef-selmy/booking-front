import { useState } from "react";
import useValidation from "../../../../api/useValidatoin";
import useApi from "../../../../api/useApi";
import Popup from "../../../components/Popup";
import Input from "../../../components/Input";
import SelectMenu from "../../../components/SelectMenu";
import Button from "../../../components/Button";
import api from "../../../../api/axios";

const AddPopup = ({ mode, setMode, setData }) => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const { validationErrors, clearErrors, validateEmail, validatePassword } =
    useValidation();

  const { globalErrors, loading, request } = useApi((payload) =>
    api.post("users", payload),
  );

  const handleCreate = async () => {
    clearErrors();
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (!isValidEmail || !isValidPassword) return;
    const { data, ok } = await request({
      userName,
      email,
      password,
      role: role.name,
    });
    if (ok) {
      setData((prev) => [...prev, data.data]);
      setMode(null);
    }
  };
  return (
    <Popup
      title={mode}
      setMode={setMode}
      open={mode === "Add"}
      globalErrors={globalErrors}
    >
      <Input title="UserName" value={userName} setValue={setUserName} />
      <Input
        title="Email"
        value={email}
        setValue={setEmail}
        errorMessage={validationErrors.email}
      />
      <Input
        title="Password"
        value={password}
        setValue={setPassword}
        errorMessage={validationErrors.password}
      />
      <SelectMenu
        title="Role"
        options={[
          { id: "1", name: "front_office" },
          { id: "2", name: "manager" },
        ]}
        value={role}
        setValue={setRole}
      />
      <Button
        disabled={loading || !userName || !email || !password || !role}
        onClick={handleCreate}
        full
      >
        Create
      </Button>
    </Popup>
  );
};

export default AddPopup