import { useEffect, useState } from "react";
import api from "../../../../api/axios";
import Card from "../../../components/Card";
import ErrorsBlock from "../../../components/ErrorsBlock";
import SelectMenu from "../../../components/SelectMenu";
import Input from "../../../components/Input";
import Table from "../../../components/Table/Table";
import TableRow from "../../../components/Table/TableRow";
import TableData from "../../../components/Table/TableData";
import { IoMdAdd } from "react-icons/io";
import Section from "../../../components/Section";
import { useOutletContext } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import Button from "../../../components/Button";

const Rooms = () => {
  const { data, id } = useOutletContext();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  const [roomFilters, setRoomFilters] = useState();
  const [loading, setLoading] = useState(false);
  const [avilableRooms, setAvilableRooms] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!data || categoryOptions.length === 0 || typeOptions.length === 0)
      return;
    console.log(data)
    const newData = data.rooms.map((e) => ({
      category: categoryOptions.find((o) => o.name === e.room?.category),
      type: typeOptions.find((o) => o.name === e.room?.type),
      package: e.package,
      perDay: e.perDay,
      roomNumber: e.room?.roomNumber,
      floor: e.room?.floor,
      view: e.room?.view,
      room: e._id,
      _id: e._id,
    }));
    setSelectedRooms(newData);
  }, [data, categoryOptions, typeOptions]);

  useEffect(() => {
    const handle = async () => {
      const [categoriesRes, typesRes] = await Promise.all([
        api.get("roomCategory?all=true"),
        api.get("roomType?all=true"),
      ]);
      setCategoryOptions([
        { name: "All", _id: 0, ignore: true },
        ...categoriesRes.data.data,
      ]);
      setTypeOptions([
        { name: "All", _id: 0, ignore: true },
        ...typesRes.data.data,
      ]);
    };
    handle();
  }, [data]);

  const handleSave = async () => {
    let stop = false;
    selectedRooms.forEach((e) => {
      if (!e.perDay || e.perDay === "") {
        setErrors([`Room ${e.roomNumber}: price per night is required`]);
        stop = true;
        return;
      }
    });
    if (stop) return;
    const d = selectedRooms.map((e) => ({
      package: e.package?._id,
      perDay: e.perDay,
      room: e._id,
    }));
    // return;
    const newData = {
      rooms: d,
    };
    try {
      setLoading(true);
      const res = await api.put(`reservation/${id}`, newData);
    } catch (error) {
      setErrors([error.response.data.message]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handle = async () => {
      setErrors([]);
      if (!data?.checkIn || !data?.checkOut) return;
      setLoading(true);
      let queries = `?checkIn=${data.checkIn}&checkOut=${data.checkOut}`;
      if (roomFilters)
        for (const [key, value] of Object.entries(roomFilters))
          if (value) queries += `&${key}=${value}`;
      try {
        const { data } = await api.get(`reservation/available/rooms${queries}`);
        setAvilableRooms(data.data);
      } catch (error) {
        setErrors([error.response.data.message]);
      } finally {
        setLoading(false);
      }
    };
    handle();
  }, [roomFilters, data]);

  const handleAdd = (roomNumber) => {
    const isExist = selectedRooms.some((e) => e.roomNumber === roomNumber);
    if (isExist) return;
    const room = avilableRooms.find((e) => e.roomNumber === roomNumber);
    if (room === undefined) return;
    setSelectedRooms((prev) => [...prev, room]);
  };

  const handleDelete = (roomNumber) => {
    setSelectedRooms((prev) =>
      prev.filter((item) => item.roomNumber !== roomNumber),
    );
  };

  const handleRoomPrice = (roomNumber, price) => {
    const isExist = selectedRooms.some((e) => e.roomNumber === roomNumber);
    if (!isExist) return;
    setSelectedRooms((prev) => {
      const copy = [...prev];

      const index = copy.findIndex((e) => e.roomNumber === roomNumber);
      if (index === -1) return prev;

      copy[index] = {
        ...copy[index],
        perDay: price,
      };

      return copy;
    });
  };

  const handleRoomPackage = (roomNumber, Package) => {
    const isExist = selectedRooms.some((e) => e.roomNumber === roomNumber);
    if (!isExist) return;
    setSelectedRooms((prev) => {
      const copy = [...prev];

      const index = copy.findIndex((e) => e.roomNumber === roomNumber);
      if (index === -1) return prev;

      copy[index] = {
        ...copy[index],
        package: Package,
      };

      return copy;
    });
  };

  return (
    <Section extraPadding>
      <Card>
        <h2 className="text-2xl font-medium">Rooms</h2>
        <ErrorsBlock globalErrors={errors} />
        <Filters
          roomFilters={roomFilters}
          setRoomFilters={setRoomFilters}
          categoryOptions={categoryOptions}
          typeOptions={typeOptions}
        />
        <RoomsTable
          avilableRooms={avilableRooms}
          loading={loading}
          handleAdd={handleAdd}
        />
        <SelectedField
          selectedRooms={selectedRooms}
          handleDelete={handleDelete}
          handleRoomPrice={handleRoomPrice}
          handleRoomPackage={handleRoomPackage}
        />
      </Card>
      <Button
        full
        className="my-5 text-xl"
        disabled={loading || selectedRooms.length === 0}
        onClick={handleSave}
      >
        Save
      </Button>
    </Section>
  );
};

const Filters = ({
  roomFilters,
  setRoomFilters,
  categoryOptions,
  typeOptions,
}) => {
  return (
    <div className="flex flex-wrap gap-5 my-5 items-end">
      <SelectMenu
        title="Category"
        options={categoryOptions}
        value={categoryOptions.find((e) => e._id === roomFilters?.category)}
        setValue={(v) => {
          v.ignore
            ? setRoomFilters((e) => ({ ...e, category: null }))
            : setRoomFilters((e) => ({ ...e, category: v._id }));
        }}
      />
      <SelectMenu
        title="Type"
        options={typeOptions}
        value={typeOptions.find((e) => e._id === roomFilters?.type)}
        setValue={(v) => {
          v.ignore
            ? setRoomFilters((e) => ({ ...e, type: null }))
            : setRoomFilters((e) => ({ ...e, type: v._id }));
        }}
      />
      <Input
        title="Floor"
        value={roomFilters?.floor}
        setValue={(v) => setRoomFilters((e) => ({ ...e, floor: v }))}
      />
      <Input
        title="View"
        value={roomFilters?.view}
        setValue={(v) => setRoomFilters((e) => ({ ...e, view: v }))}
      />
      <Input
        title="Adult No."
        value={roomFilters?.adults}
        setValue={(v) => setRoomFilters((e) => ({ ...e, adults: v }))}
      />
      <Input
        title="Chaildren No."
        value={roomFilters?.children}
        setValue={(v) => setRoomFilters((e) => ({ ...e, children: v }))}
      />
    </div>
  );
};

const RoomsTable = ({ avilableRooms, loading, handleAdd }) => {
  return (
    <Table
      head={["Room No.", "Floor", "Category", "Type", "View", "Add"]}
      loading={loading}
    >
      {avilableRooms.map((ele, idx) => (
        <TableRow key={idx} rowNum={idx}>
          <TableData>{ele.roomNumber}</TableData>
          <TableData>{ele.floor}</TableData>
          <TableData>{ele.category.name}</TableData>
          <TableData>{ele.type.name}</TableData>
          <TableData>{ele.view}</TableData>
          <TableData className="">
            <p
              onClick={() => handleAdd(ele.roomNumber)}
              className="flex justify-center w-full cursor-pointer text-blue-600"
            >
              <IoMdAdd />
            </p>
          </TableData>
        </TableRow>
      ))}
      {avilableRooms.length === 0 && (
        <>
          <TableRow rowNum={1}>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
          </TableRow>
          <TableRow rowNum={2}>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
          </TableRow>
          <TableRow rowNum={3}>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
          </TableRow>
          <TableRow rowNum={4}>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
          </TableRow>
          <TableRow rowNum={5}>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
            <TableData>-</TableData>
          </TableRow>
        </>
      )}
    </Table>
  );
};

const SelectedField = ({
  selectedRooms,
  handleDelete,
  handleRoomPackage,
  handleRoomPrice,
}) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const handle = async () => {
      const { data } = await api.get("packages");
      setPackages([
        { name: "No Package", price: 0, ignore: true },
        ...data.data,
      ]);
    };
    handle();
  }, []);

  return (
    <div className="flex flex-wrap gap-5 mt-5">
      {selectedRooms.map((ele, idx) => (
        <RoomField
          key={idx}
          room={ele}
          handleDelete={handleDelete}
          packages={packages}
          handleRoomPackage={handleRoomPackage}
          handleRoomPrice={handleRoomPrice}
        />
      ))}
    </div>
  );
};

const RoomField = ({
  room,
  packages,
  handleDelete,
  handleRoomPackage,
  handleRoomPrice,
}) => {
  return (
    <div className="border border-[#ddd] rounded w-120 shadow">
      <div className="flex justify-between items-center p-3 border-b border-[#ddd]">
        <p className="text-xl font-medium">Room #{room.roomNumber}</p>
        <p
          className="p-1 text-xl rounded cursor-pointer bg-red-500 text-white hover:bg-red-600 duration-300"
          onClick={() => handleDelete(room.roomNumber)}
        >
          <BiTrash />
        </p>
      </div>
      <div className="p-3 flex flex-col gap-10">
        <div className="flex gap-3 flex-wrap">
          <Input title="Floor" value={room.floor} readOnly />
          <Input title="View" value={room.view} readOnly />
          <Input title="Category" value={room.category?.name} readOnly />
          <Input title="Type" value={room.type?.name} readOnly />
        </div>
        <div className="flex flex-wrap gap-3">
          <SelectMenu
            options={packages}
            title="Package"
            value={room.package}
            setValue={(v) => handleRoomPackage(room.roomNumber, v)}
          />
          <Input
            type="number"
            title="Package Price"
            value={room.package?.price}
            readOnly
          />
          <Input
            type="number"
            title="Price Pre Night"
            value={room.perDay}
            setValue={(v) => handleRoomPrice(room.roomNumber, v)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Rooms;
