import React, { useEffect, useState } from "react";
import Card from "../../../../../components/Card";
import Input from "../../../../../components/Input";
import SelectMenu from "../../../../../components/SelectMenu";
import api from "../../../../../../api/axios";

const MainInfo = ({
  mainInfo,
  setMainInfo,
  date,
  setDate,
  travelAgent,
  setTravelAgent,
}) => {
  const [travelAgentOptions, setTravelAgentOptions] = useState([]);

  useEffect(() => {
    const handle = async () => {
      const { data } = await api.get("travel-agents");
      console.log(data);
      setTravelAgentOptions(data.data);
    };
    handle();
  }, []);
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
          value={date?.checkOut}
          setValue={(v) => setDate((e) => ({ ...e, checkOut: v }))}
        />
         <SelectMenu
          title="Travel Agent"
          options={travelAgentOptions}
          value={travelAgent}
          setValue={setTravelAgent}
        />
      </div>
    </Card>
  );
};

export default MainInfo;
