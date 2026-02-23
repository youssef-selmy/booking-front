import { useEffect, useState } from "react";
import Popup from "../../../../components/Popup";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import SelectMenu from "../../../../components/SelectMenu";
import useApi from "../../../../../hooks/useApi";
import api from "../../../../../api/axios";

const AddPopup = ({ mode, setMode, setData }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [type, setType] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [view, setView] = useState("");
  const [maxAdult, setMaxAdult] = useState("");
  const [maxChildren, setMaxChildren] = useState("");
  const { globalErrors, loading, request } = useApi((payload) =>
    api.post("rooms", payload),
  );

  const handleCreate = async () => {
    if (
      !roomNumber ||
      !floor ||
      !type ||
      !category ||
      !view ||
      !maxAdult ||
      !maxChildren
    )
      return;
    const dataObj = {
      roomNumber,
      floor,
      type: type._id,
      category: category._id,
      view,
      maxGuests: maxAdult,
      MaxChildren: maxChildren,
    };
    try {
      const res = await request(dataObj);
      if (res.ok) {
        setData((prev) => [...prev, res.data.data]);
        setMode(null);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    const handle = async () => {
      const { data } = await api.get("roomType?all=true");
      setTypeOptions(data.data);
    };
    handle();
  }, []);

  useEffect(() => {
    const handle = async () => {
      const { data } = await api.get("roomCategory?all=true");
      setCategoryOptions(data.data);
    };
    handle();
  }, []);

  return (
    <Popup title={mode} setMode={setMode} globalErrors={globalErrors}>
      <div className="flex flex-wrap gap-5">
        <Input title="Room No." value={roomNumber} setValue={setRoomNumber} />
        <Input title="Floor" value={floor} setValue={setFloor} />
        <SelectMenu
          title="Type"
          options={typeOptions}
          value={type}
          setValue={setType}
        />
        <SelectMenu
          title="Category"
          options={categoryOptions}
          value={category}
          setValue={setCategory}
        />
        <Input title="View" value={view} setValue={setView} />
        <Input title="Max Adult" value={maxAdult} setValue={setMaxAdult} />
        <Input
          title="Max Children"
          value={maxChildren}
          setValue={setMaxChildren}
        />
      </div>
      <Button
        full
        onClick={handleCreate}
        disabled={
          loading ||
          !roomNumber ||
          !floor ||
          !type ||
          !category ||
          !view ||
          !maxAdult ||
          !maxChildren
        }
      >
        Create
      </Button>
    </Popup>
  );
};

export default AddPopup