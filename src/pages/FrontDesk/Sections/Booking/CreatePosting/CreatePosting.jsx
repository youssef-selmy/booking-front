import React, { useEffect, useState } from "react";
import Section from "../../../../../components/Section";
import Card from "../../../../../components/Card";
import Input from "../../../../../components/Input";
import Table from "../../../../../components/Table/Table";
import TableRow from "../../../../../components/Table/TableRow";
import TableData from "../../../../../components/Table/TableData";
import Button from "../../../../../components/Button";
import { FaRegTrashCan } from "react-icons/fa6";
import SelectMenu from "../../../../../components/SelectMenu";
import api from "../../../../../../api/axios";
import { IoMdAdd } from "react-icons/io";

const CreatePosting = () => {
  const [mainInfo, setMainInfo] = useState();
  const [date, setDate] = useState();
  const [companyInfo, setCompanyInfo] = useState([]);
  const [rooms, setRooms] = useState();
  const [payment, setPayment] = useState();
  return (
    <Section extraPadding classname="px-5 w-full flex flex-col gap-5 pb-5">
      <MainInfo
        mainInfo={mainInfo}
        setMainInfo={setMainInfo}
        date={date}
        setDate={setDate}
      />
      <CompanyInfo companyInfo={companyInfo} setCompanyInfo={setCompanyInfo} />
      <Rooms rooms={rooms} setRooms={setRooms} />
      <Payments payment={payment} setPayment={setPayment} />
      <Button className='p-4 text-xl'>Create Reservation</Button>
    </Section>
  );
};

const MainInfo = ({ mainInfo, setMainInfo, date, setDate }) => {
  return (
    <Card className="w-full">
      <h2 className="text-2xl font-medium">Main Info</h2>
      <div className="flex flex-wrap gap-5 my-5">
        <Input
          title="First Name"
          value={mainInfo?.firstName}
          setValue={(v) => setMainInfo((e) => ({ ...e, firstName: v }))}
        />
        <Input
          title="Last Name"
          value={mainInfo?.lastName}
          setValue={(v) => setMainInfo((e) => ({ ...e, lastName: v }))}
        />
        <Input
          title="Age"
          value={mainInfo?.age}
          setValue={(v) => setMainInfo((e) => ({ ...e, age: v }))}
        />
        <Input
          title="Nationality"
          value={mainInfo?.nationality}
          setValue={(v) => setMainInfo((e) => ({ ...e, nationality: v }))}
        />
        <Input
          title="ID"
          value={mainInfo?.idNumber}
          setValue={(v) => setMainInfo((e) => ({ ...e, idNumber: v }))}
        />
      </div>
      <div className="flex flex-wrap gap-5">
        <Input
          type="date"
          title="Arrive At"
          value={date?.checkIn}
          setValue={(v) => setDate((e) => ({ ...e, checkIn: v }))}
        />
        <Input
          type="date"
          title="Dparture At"
          value={date?.checkout}
          setValue={(v) => setDate((e) => ({ ...e, checkout: v }))}
        />
      </div>
    </Card>
  );
};

const CompanyInfo = ({ companyInfo = [], setCompanyInfo }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    nationality: "",
    idNumber: "",
  });

  const handleAdd = () => {
    for (const [key, val] of Object.entries(data)) {
      if (!val) return;
    }
    setCompanyInfo((prev) => [...prev, data]);
    setData({
      firstName: "",
      lastName: "",
      age: "",
      nationality: "",
      idNumber: "",
    });
  };

  const handleDelete = (idNumber) => {
    setCompanyInfo((prev) => prev.filter((item) => item.idNumber !== idNumber));
  };
  return (
    <div>
      <Card>
        <h2 className="text-2xl font-medium">Company Info</h2>
        <div className="flex flex-wrap gap-5 my-5 items-end">
          <Input
            title="First Name"
            value={data.firstName}
            setValue={(v) => setData((e) => ({ ...e, firstName: v }))}
          />
          <Input
            title="Last Name"
            value={data.lastName}
            setValue={(v) => setData((e) => ({ ...e, lastName: v }))}
          />
          <Input
            title="Age"
            value={data.age}
            setValue={(v) => setData((e) => ({ ...e, age: v }))}
          />
          <Input
            title="Nationality"
            value={data.nationality}
            setValue={(v) => setData((e) => ({ ...e, nationality: v }))}
          />
          <Input
            title="ID"
            value={data.idNumber}
            setValue={(v) => setData((e) => ({ ...e, idNumber: v }))}
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
        <Table
          head={[
            "First Name",
            "Last Name",
            "Age",
            "Nationality",
            "ID",
            "Delete",
          ]}
        >
          {companyInfo.map((ele, idx) => (
            <TableRow key={idx} rowNum={idx}>
              <TableData>{ele.firstName}</TableData>
              <TableData>{ele.lastName}</TableData>
              <TableData>{ele.age}</TableData>
              <TableData>{ele.nationality}</TableData>
              <TableData>{ele.idNumber}</TableData>
              <TableData className="">
                <p
                  onClick={() => handleDelete(ele.idNumber)}
                  className="flex justify-center w-full cursor-pointer text-red-600"
                >
                  <FaRegTrashCan />
                </p>
              </TableData>
            </TableRow>
          ))}
          {companyInfo.length === 0 && (
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
      </Card>
    </div>
  );
};

const Rooms = ({ rooms = [], setRooms }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    nationality: "",
    idNumber: "",
  });
  const [roomsData, setRoomsData] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  const handleAdd = () => {
    for (const [key, val] of Object.entries(data)) {
      if (!val) return;
    }
    setRooms((prev) => [...prev, data]);
    setData({
      firstName: "",
      lastName: "",
      age: "",
      nationality: "",
      idNumber: "",
    });
  };

  const handleDelete = (idNumber) => {
    setRooms((prev) => prev.filter((item) => item.idNumber !== idNumber));
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
      console.log("Carigory", data);
      setCategoryOptions(data.data);
    };
    handle();
  }, []);

  return (
    <div>
      <Card>
        <h2 className="text-2xl font-medium">Rooms</h2>
        <div className="flex flex-wrap gap-5 my-5 items-end">
          <SelectMenu
            title="Category"
            options={categoryOptions}
            value={data.category}
            setValue={(v) => setData((e) => ({ ...e, category: v }))}
          />
          <SelectMenu
            title="Type"
            options={typeOptions}
            value={data.type}
            setValue={(v) => setData((e) => ({ ...e, type: v }))}
          />
          <Input
            title="Floor"
            value={data.floor}
            setValue={(v) => setData((e) => ({ ...e, floor: v }))}
          />
          <Input
            title="View"
            value={data.idNumber}
            setValue={(v) => setData((e) => ({ ...e, idNumber: v }))}
          />
          <Input
            title="Adult No."
            value={data.adults}
            setValue={(v) => setData((e) => ({ ...e, adults: v }))}
          />
          <Input
            title="Chaildren No."
            value={data.children}
            setValue={(v) => setData((e) => ({ ...e, children: v }))}
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
        <Table head={["Room No.", "Floor", "Category", "Type", "View", "Add"]}>
          {roomsData.map((ele, idx) => (
            <TableRow key={idx} rowNum={idx}>
              <TableData>{ele.roomNumber}</TableData>
              <TableData>{ele.floor}</TableData>
              <TableData>{ele.category}</TableData>
              <TableData>{ele.type}</TableData>
              <TableData>{ele.view}</TableData>
              <TableData className="">
                <p
                  onClick={() => handleDelete(ele.idNumber)}
                  className="flex justify-center w-full cursor-pointer text-blue-600"
                >
                  <IoMdAdd />
                </p>
              </TableData>
            </TableRow>
          ))}
          {roomsData.length === 0 && (
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
      </Card>
    </div>
  );
};

const Payments = ({ payment, setPayment }) => {
  return (
    <Card>
      <h2 className="text-2xl font-medium">Payments</h2>
      <div className="mt-5 flex gap-5">
        <Input title="Total" value={payment?.total} readOnly />
        <Input
          title="Amount To Pay"
          value={payment?.paid}
          setValue={(v) => setPayment((e) => ({ ...e, paid: v }))}
        />
      </div>
    </Card>
  );
};

export default CreatePosting;
