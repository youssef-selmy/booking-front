import { useEffect, useState } from "react";
import Popup from "../../../../components/Popup";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import SelectMenu from "../../../../components/SelectMenu";
import useApi from "../../../../../hooks/useApi";
import api from "../../../../../api/axios";

const EditPopup = ({ mode, setMode, editItem, setEditItem }) => {
  const [item, setItem] = useState();
  const [typeOptions, setTypeOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isSure, setIsSure] = useState(false);
  const { globalErrors, request, loading } = useApi((payload) =>
    api.put(`rooms/${editItem._id}`, payload),
  );

  useEffect(() => {
    const loadData = async () => {
      let dataObj = { ...editItem };

      const [categoriesRes, typesRes] = await Promise.all([
        api.get("roomCategory?all=true"),
        api.get("roomType?all=true"),
      ]);

      dataObj.category = categoriesRes.data.data.find(
        (o) => o.name === editItem?.category,
      );

      dataObj.type = typesRes.data.data.find((o) => o.name === editItem?.type);
      setCategoryOptions(categoriesRes.data.data);
      setTypeOptions(typesRes.data.data);

      setItem(dataObj);
    };

    loadData();
  }, [editItem]);

  const HandleUpdate = async () => {
    let isValid = true;
    const data = { ...item, category: item.category._id, type: item.type._id };
    for (const [key, val] of Object.entries(data)) {
      if (!val) {
        isValid = false;
        break;
      }
    }
    try {
      const res = await request(data);
      if (res.ok) {
        setMode(null);
        setEditItem(null)
      }
    } catch (error) {
    }
  };

  const HandleDelete = async () => {
    if (!isSure) return;
  };

  return (
    <Popup title={mode} setMode={setMode} globalErrors={globalErrors}>
      <div className="flex flex-wrap gap-5">
        <Input
          title="Room No."
          value={item?.roomNumber}
          setValue={(v) => setItem((prev) => ({ ...prev, roomNumber: v }))}
        />
        <Input
          title="Floor"
          value={item?.floor}
          setValue={(v) => setItem((prev) => ({ ...prev, floor: v }))}
        />
        <SelectMenu
          options={typeOptions}
          title="Type"
          value={item?.type}
          setValue={(v) => setItem((prev) => ({ ...prev, type: v }))}
        />
        <SelectMenu
          options={categoryOptions}
          title="Category"
          value={item?.category}
          setValue={(v) => setItem((prev) => ({ ...prev, category: v }))}
        />
        <Input
          title="View"
          value={item?.view}
          setValue={(v) => setItem((prev) => ({ ...prev, view: v }))}
        />
        <Input
          title="Max Adult"
          value={item?.maxGuests}
          setValue={(v) => setItem((prev) => ({ ...prev, maxGuests: v }))}
        />
        <Input
          title="Max Children"
          value={item?.MaxChildren}
          setValue={(v) => setItem((prev) => ({ ...prev, MaxChildren: v }))}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Button
          full={true}
          onClick={HandleUpdate}
          disabled={
            loading ||
            !item?.roomNumber ||
            !item.floor ||
            !item.type ||
            !item.category ||
            !item.view ||
            !item.maxGuests ||
            !item.MaxChildren
          }
        >
          Update
        </Button>
        {!isSure && (
          <Button
            full={true}
            onClick={() => setIsSure(true)}
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
