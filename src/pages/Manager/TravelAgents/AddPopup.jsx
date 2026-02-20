import { useState } from "react";
import useValidation from "../../../../hooks/useValidatoin";
import useApi from "../../../../hooks/useApi";
import Popup from "../../../components/Popup";
import Input from "../../../components/Input";
import SelectMenu from "../../../components/SelectMenu";
import Button from "../../../components/Button";
import api from "../../../../api/axios";

const AddPopup = ({ mode, setMode, setData, dataLength }) => {
  const [userName, setUserName] = useState();
  const { globalErrors, loading, request } = useApi((payload) =>
    api.post("travel-agents", payload),
  );

  const handleCreate = async () => {

    if (!userName) return;
    const { data, ok } = await request({
      name: userName,
    });
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
      setUserName("");
      setMode(null);
    }
  };
  return (
    <Popup title={mode} setMode={setMode} globalErrors={globalErrors}>
      <Input title="UserName" value={userName} setValue={setUserName} />
      <Button disabled={loading || !userName} onClick={handleCreate} full>
        Create
      </Button>
    </Popup>
  );
};

export default AddPopup;
