import { Fragment, useEffect, useState } from "react";
import Card from "../../components/Card";
import Section from "../../components/Section";
import Table from "../../components/Table/Table";
import TableData from "../../components/Table/TableData";
import TableRow from "../../components/Table/TableRow";
import api from "../../../api/axios";
import useTable from "../../../hooks/useTable";

const ManagerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [overView, setOverView] = useState();
  const [rooms, setRooms] = useState();
  const [arrivals, setArrivals] = useState();
  const [departures, setDepartures] = useState();

  useEffect(() => {
    const handle = async () => {
      const { data } = await api.get("dashboard/overview");
      setOverView({
        arrival: data.arrival,
        departure: data.departure,
        inHouse: data.inHouse,
        avilableRooms: data.avilableRooms,
        occupiedRooms: data.occupiedRooms,
      });
      setArrivals(data.arrivals);
      setRooms(data.rooms);
      setDepartures(data.departuers);
      setLoading(false);
    };
    handle();
  }, []);

  return (
    <Section classname="p-5 pt-[90px] flex flex-col gap-5">
      <Overview data={overView} loading={loading} />
      <Rooms data={rooms} loading={loading} />
      <div className="flex gap-5">
        <Arrivals data={arrivals} loading={loading} />
        <Departures data={departures} loading={loading} />
      </div>
    </Section>
  );
};

const Overview = ({ data, loading }) => {
  return (
    <Card>
      <h2 className="text-3xl font-medium mb-4">OverView</h2>
      {!loading && (
        <div className="flex justify-between gap-5 px-5">
          <OverviewField
            title="Today's"
            name="Arrival"
            number={data?.arrival}
          />
          <OverviewField
            title="Today's"
            name="Departure"
            number={data?.departure}
          />
          <OverviewField title="Total" name="In House" number={data?.inHouse} />
          <OverviewField
            title="Total"
            name="Avilable Rooms"
            number={data?.avilableRooms}
          />
          <OverviewField
            title="Total"
            name="Occupied Rooms"
            number={data?.occupiedRooms}
          />
        </div>
      )}
      {loading && <p>Loading...</p>}
    </Card>
  );
};

const OverviewField = ({ title, name, number }) => {
  return (
    <div>
      <span className="text-stone-400 text-sm">{title}</span>
      <div className="flex items-end gap-2">
        <p className="text-2xl">{name}</p>
        <p className="text-4xl text-blue-700 font-medium">{number}</p>
      </div>
    </div>
  );
};

const Rooms = ({ data, loading }) => {
  return (
    <Card className="min-w-[60%]">
      <h2 className="text-3xl font-medium mb-4">Rooms</h2>
      {!loading && (
        <div className="flex gap-5 overflow-x-auto custom-scroll">
          {data?.map((ele, idx) => (
            <RoomTypeCard
              key={idx}
              title={ele.name}
              types={ele.types}
              // total={ele.total}
              // totalOccubied={ele.totalOccubied}
              // revenu={ele.revenu}
            />
          ))}
        </div>
      )}
      {loading && <p>Loading...</p>}
    </Card>
  );
};

const RoomTypeCard = ({ title, types = [], total, totalOccubied, revenu }) => {
  return (
    <Card className="w-[250px] min-w-[250px]">
      <h3 className="text-2xl font-medium mb-2">{title}</h3>
      <div className="my-5 h-[122px] overflow-y-auto custom-scroll">
        {types.map((ele, idx) => (
          <Fragment key={idx}>
            <div key={idx} className="flex justify-between font-medium my-2">
              <p>{ele.name}</p>
              <p>{ele.value}</p>
            </div>
            {idx + 1 !== types.length && <p className="h-[1px] bg-[#ddd]"></p>}
          </Fragment>
        ))}
      </div>
      {/* <div className="flex justify-between">
        <div className="flex items-center">
          <p className="text-xl font-medium">{totalOccubied}</p>
          <p className="text-[#aaa]">/{total}</p>
        </div>
        <div className="flex items-center">
          <p className="text-xl font-medium text-blue-800">${revenu}</p>
          <p className="text-[#aaa]">/day</p>
        </div>
      </div> */}
    </Card>
  );
};

const Arrivals = () => {
  const { data, loading } = useTable("front-office/arrivals");
  return (
    <Card className="w-[50%]">
      <h2 className="text-3xl font-medium mb-4">Today’s Arrival</h2>
      <Table
        loading={loading}
        head={[
          "Confirmation Number",
          "Main Guest Name",
          "Travel Agent",
          "Rooms Count",
          "Arrive Date",
          "Reserved Nights",
        ]}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.confirmationNumber}</TableData>
            <TableData>{ele.mainGuestName}</TableData>
            <TableData>{ele.travelAgent}</TableData>
            <TableData>{ele.roomsCount}</TableData>
            <TableData>{ele.arriveDate?.split("T")[0]}</TableData>
            <TableData>{ele.reservedNights}</TableData>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
};

const Departures = () => {
  const { data, loading } = useTable("front-office/departures");
  return (
    <Card className="w-[50%]">
      <h2 className="text-3xl font-medium mb-4">Today’s Arrival</h2>
      <Table
        loading={loading}
        head={[
          "Confirmation Number",
          "Main Guest Name",
          "Travel Agent",
          "Rooms Count",
          "Departure Date",
          "Reserved Nights",
        ]}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.confirmationNumber}</TableData>
            <TableData>{ele.mainGuestName}</TableData>
            <TableData>{ele.travelAgent}</TableData>
            <TableData>{ele.roomsCount}</TableData>
            <TableData>{ele.departureDate?.split("T")[0]}</TableData>
            <TableData>{ele.reservedNights}</TableData>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
};

export default ManagerDashboard;
