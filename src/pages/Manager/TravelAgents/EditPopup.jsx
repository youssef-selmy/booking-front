import { useState } from "react";
import useValidation from "../../../../hooks/useValidatoin";
import useApi from "../../../../hooks/useApi";
import api from "../../../../api/axios";
import Popup from "../../../components/Popup";
import Input from "../../../components/Input";
import SelectMenu from "../../../components/SelectMenu";
import Button from "../../../components/Button";

const EditPopup = ({ mode, setMode, editItem, setEditItem }) => {
  const [userName, setUserName] = useState(editItem.name);
  const [isSure, setIsSure] = useState(false);
  const { globalErrors, request, loading } = useApi((payload) =>
    api.patch(`travel-agents/${editItem._id}`, payload),
  );

  const HandleUpdate = async () => {
    const { ok } = await request({ name: userName });
    if (ok) {
      setMode(null);
      setEditItem(null);
    }
  };

  const HandleDelete = async () => {
    if (!isSure) {
      setIsSure(true);
      return;
    }
    const { data } = await api.delete(`travel-agents/${editItem._id}`);
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
      <div className="flex flex-col gap-5 w-full">
        <Button full={true} onClick={HandleUpdate} disabled={loading}>
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
      </div>
    </Popup>
  );
};

export default EditPopup;
