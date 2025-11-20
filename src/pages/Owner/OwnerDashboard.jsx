import { useState } from "react";
import Card from "../../components/Card";
import Section from "../../components/Section";
import Table from "../../components/Table/Table";

const OwnerDashboard = () => {
  return (
    <Section classname="p-5 pt-[90px] flex flex-col gap-5">
      <Overview />
      <div className="flex gap-5">
        <Rooms />
        <Users />
      </div>
      <div className="flex gap-5">
        <Arrivals />
        <Departures />
      </div>
    </Section>
  );
};

const Overview = () => {
  return (
    <Card>
      <h2 className="text-3xl font-medium mb-4">OverView</h2>
      <div className="flex justify-between gap-5 px-5">
        <OverviewField title="Today's" name="Arrival" number={23} />
        <OverviewField title="Today's" name="Departure" number={30} />
        <OverviewField title="Total" name="In House" number={60} />
        <OverviewField title="Total" name="Avilable Rooms" number={10} />
        <OverviewField title="Total" name="Occupied Rooms" number={20} />
      </div>
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

const Rooms = () => {
  const [data, setData] = useState([
    {
      title: "Standurd",
      categories: [
        { name: "Single", number: 10 },
        { name: "Double", number: 10 },
        { name: "Family", number: 10 },
      ],
      total: 30,
      totalOccubied: 12,
      revenu: 512,
    },
    {
      title: "Standurd",
      categories: [
        { name: "Single", number: 10 },
        { name: "Double", number: 10 },
        { name: "Family", number: 10 },
      ],
      total: 30,
      totalOccubied: 12,
      revenu: 512,
    },
    {
      title: "Standurd",
      categories: [
        { name: "Single", number: 10 },
        { name: "Double", number: 10 },
        { name: "Family", number: 10 },
      ],
      total: 30,
      totalOccubied: 12,
      revenu: 512,
    },
    {
      title: "Dulex",
      categories: [
            { name: "Single", number: 10 },
            { name: "Double", number: 10 },
            { name: "Family", number: 10 },
            { name: "Family", number: 10 },
          ],
      total: 30,
      totalOccubied: 12,
      revenu: 512,
    },
    {
      title: "Suit",
      categories: [
            { name: "Single", number: 10 },
            { name: "Double", number: 10 },
            { name: "Family", number: 10 },
          ],
      total: 30,
      totalOccubied: 12,
      revenu: 512,
    },
  ]);
  return (
    <Card className="min-w-[60%]">
      <h2 className="text-3xl font-medium mb-4">Rooms</h2>
      <div className="flex gap-5 overflow-x-auto custom-scroll">
        {data.map((ele, idx) => (
          <RoomTypeCard key={idx} title={ele.title} categories={ele.categories} total={ele.total} totalOccubied={ele.totalOccubied} revenu={ele.revenu} />
        ))}
      </div>
    </Card>
  );
};

const RoomTypeCard = ({
  title,
  categories = [],
  total,
  totalOccubied,
  revenu,
}) => {
  return (
    <Card className="w-[250px] min-w-[250px]">
      <h3 className="text-2xl font-medium mb-2">{title}</h3>
      <div className="my-5 h-[122px] overflow-y-auto custom-scroll">
        {categories.map((ele, idx) => (
          <>
            <div key={idx} className="flex justify-between font-medium my-2">
              <p>{ele.name}</p>
              <p>{ele.number}</p>
            </div>
            {idx + 1 !== categories.length && (
              <p className="h-[1px] bg-[#ddd]"></p>
            )}
          </>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <p className="text-xl font-medium">{totalOccubied}</p>
          <p className="text-[#aaa]">/{total}</p>
        </div>
        <div className="flex items-center">
          <p className="text-xl font-medium text-blue-800">${revenu}</p>
          <p className="text-[#aaa]">/day</p>
        </div>
      </div>
    </Card>
  );
};

const Users = () => {
  const [temp, setTemp] = useState([
    { user: "Ali Ahmed", role: "Owner" },
    { user: "Hamed Mamdouh", role: "Front Desk" },
    { user: "Ahmed Sameh", role: "Front Desk" },
  ]);
  return (
    <Card className="w-full">
      <h2 className="text-3xl font-medium mb-4">Users</h2>
      <Table
        head={["User", "Role"]}
        dataKeys={["user", "role"]}
        data={temp}
      />
    </Card>
  );
};

const Arrivals = () => {
  const [testData, setTestData] = useState([
    {
      number: "1",
      name: "Test Name",
      bookednights: "3",
      total: "5200",
      paid: "1200",
    },
    {
      number: "2",
      name: "Test Name",
      bookednights: "5",
      total: "6000",
      paid: "2500",
    },
    {
      number: "3",
      name: "Test Name",
      bookednights: "2",
      total: "1400",
      paid: "1400",
    },
  ]);

  return (
    <Card className="w-[50%]">
      <h2 className="text-3xl font-medium mb-4">Today’s Arrival</h2>
      <Table
        head={["Room No.", "Name", "Booked Nights", "Total", "Paid"]}
        dataKeys={["number", "name", "bookednights", "total", "paid"]}
        data={testData}
      />
    </Card>
  );
};

const Departures = () => {
  const [testData, setTestData] = useState([
    {
      number: "1",
      name: "Test Name",
      bookednights: "3",
      total: "5200",
      paid: "1200",
    },
    {
      number: "2",
      name: "Test Name",
      bookednights: "5",
      total: "6000",
      paid: "2500",
    },
    {
      number: "3",
      name: "Test Name",
      bookednights: "2",
      total: "1400",
      paid: "1400",
    },
  ]);

  return (
    <Card className="w-[50%]">
      <h2 className="text-3xl font-medium mb-4">Today’s Departure</h2>
      <Table
        head={["Room No.", "Name", "Booked Nights", "Total", "Paid"]}
        dataKeys={["number", "name", "bookednights", "total", "paid"]}
        data={testData}
      />
    </Card>
  );
};

export default OwnerDashboard;
