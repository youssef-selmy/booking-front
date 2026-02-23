import { useEffect, useState } from "react";
import Section from "../../../../components/Section";
import Input from "../../../../components/Input";
import ErrorsBlock from "../../../../components/ErrorsBlock";
import Card from "../../../../components/Card";
import SelectMenu from "../../../../components/SelectMenu";
import Table from "../../../../components/Table/Table";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import api from "../../../../../api/axios";

const Availability = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [roomFilters, setRoomFilters] = useState();
  const [reservationDate, setReservationDate] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [loading, setLoading] = useState(false);
  const [avilableRooms, setAvilableRooms] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const handle = async () => {
      setErrors([]);
      if (!reservationDate?.checkIn || !reservationDate?.checkOut) return;
      setLoading(true);
      let queries = `?checkIn=${reservationDate.checkIn}&checkOut=${reservationDate.checkOut}`;
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
  }, [roomFilters, reservationDate]);

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
  }, []);

  return (
    <Section extraPadding classname="px-5 w-full">
      <Card>
        <h2 className="text-2xl font-medium">Rooms</h2>
        <ErrorsBlock globalErrors={errors} />
        <Filters
          roomFilters={roomFilters}
          setReservationDate={setReservationDate}
          reservationDate={reservationDate}
          setRoomFilters={setRoomFilters}
          categoryOptions={categoryOptions}
          typeOptions={typeOptions}
        />
        <RoomsTable avilableRooms={avilableRooms} loading={loading} />
      </Card>
    </Section>
  );
};

const Filters = ({
  roomFilters,
  setReservationDate,
  reservationDate,
  setRoomFilters,
  categoryOptions,
  typeOptions,
}) => {
  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-5">
        <Input
          type="date"
          title="Arrive At"
          value={reservationDate?.checkIn}
          setValue={(v) => setReservationDate((e) => ({ ...e, checkIn: v }))}
        />
        <Input
          type="date"
          title="Dparture At"
          value={reservationDate?.checkOut}
          setValue={(v) => setReservationDate((e) => ({ ...e, checkOut: v }))}
        />
      </div>
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
    </div>
  );
};

const RoomsTable = ({ avilableRooms, loading }) => {
  return (
    <Table
      head={["Room No.", "Floor", "Category", "Type", "View"]}
      loading={loading}
    >
      {avilableRooms.map((ele, idx) => (
        <TableRow key={idx} rowNum={idx}>
          <TableData>{ele.roomNumber}</TableData>
          <TableData>{ele.floor}</TableData>
          <TableData>{ele.category.name}</TableData>
          <TableData>{ele.type.name}</TableData>
          <TableData>{ele.view}</TableData>
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
          </TableRow>
          <TableRow rowNum={2}>
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
          </TableRow>
          <TableRow rowNum={4}>
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
          </TableRow>
        </>
      )}
    </Table>
  );
};

export default Availability;
