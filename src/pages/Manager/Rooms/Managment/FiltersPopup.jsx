import Popup from "../../../../components/Popup";
import Input from "../../../../components/Input";
import SelectMenu from "../../../../components/SelectMenu";
import Button from "../../../../components/Button";
import { useEffect, useState } from "react";
import api from "../../../../../api/axios";

const FiltersPopup = ({ mode, setMode, filters, setFilters }) => {
  const [roomNumber, setRoomNumber] = useState(filters?.roomNumber || "");
  const [floor, setFloor] = useState(filters?.floor || "");
  const [type, setType] = useState(filters?.type || "");
  const [typeOptions, setTypeOptions] = useState([]);
  const [category, setCategory] = useState(filters?.category || "");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [view, setView] = useState(filters?.view || "");
  const [maxAdult, setMaxAdult] = useState(filters?.maxGuests || "");
  const [maxChildren, setMaxChildren] = useState(filters.MaxChildren || "");

  useEffect(() => {
    console.log("first");
    const handle = async () => {
      const { data } = await api.get("roomType?all=true");
      setTypeOptions([{ _id: 0, name: "All" }, ...data.data]);
      if(type) {
        setType(data.data.find(e => e.name === type))
      }
    };
    handle();
}, []);

useEffect(() => {
    console.log("sec");
    const handle = async () => {
        const { data } = await api.get("roomCategory?all=true");
        console.log("Carigory", data);
        setCategoryOptions([{ _id: 0, name: "All" }, ...data.data]);
        if(category) {
          setType(data.data.find(e => e.name === category))
        }
    };
    handle();
  }, []);

  const handleFilter = async () => {
    const dataObj = {};
    if (roomNumber) dataObj.roomNumber = roomNumber;
    if (floor) dataObj.floor = floor;
    if (type && type._id !== 0) dataObj.type = type.name;
    if (category && category._id !== 0) dataObj.category = category.name;
    if (view) dataObj.view = view;
    if (maxAdult) dataObj.maxGuests = maxAdult;
    if (maxChildren) dataObj.MaxChildren = maxChildren;

    setFilters(dataObj);
    setMode(null);
  };

  return (
    <Popup title={mode} open={mode === "Filters"} setMode={setMode}>
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
      <Button full onClick={handleFilter}>
        Search
      </Button>
    </Popup>
  );
};

export default FiltersPopup;