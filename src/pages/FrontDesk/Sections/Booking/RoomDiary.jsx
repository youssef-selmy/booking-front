import React, { useEffect, useState } from "react";
import Section from "../../../../components/Section";
import api from "../../../../../api/axios";

const RoomDiary = () => {
  const [bodyData, setBodyData] = useState();
  const [headData, setHeadData] = useState();

  useEffect(() => {
    const handle = async () => {
      const { data } = await api.get("room-diary");
      console.log(data);
      setBodyData(data.data);
      setHeadData({
        from: data.from.split("T")[0],
        totalDays: data.totalDays,
        totalRooms: data.totalRooms,
      });
    };
    handle();
    0;
  }, []);

  return (
    <Section extraPadding classname="px-5 w-full pb-5">
      <div className="w-full bg-white border border-[#ddd] rounded">
        <Head data={headData} />
        <Content data={bodyData} />
      </div>
    </Section>
  );
};

const Head = ({ data }) => {
  const [daysData, setDaysData] = useState([]);

  useEffect(() => getNextFiveDays(data?.from), [data]);

  function getNextFiveDays(startDateString) {
    if (!startDateString) return;
    const result = [];
    const startDate = new Date(startDateString);

    for (let i = 0; i < 5; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const dayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      const dayNumber = String(currentDate.getDate()).padStart(2, "0");

      result.push({
        day: dayName,
        num: dayNumber,
      });
    }
    setDaysData(result);
  }

  return (
    <>
      <div className="border-b border-[#ddd] flex justify-center items-center w-full p-3">
        <p className="text-lg">{data?.from}</p>
      </div>
      <div className="border-b border-[#ddd] flex">
        <div className="border-r border-[#ddd] p-3 w-[10%] text-center">
          Total Rooms: {data?.totalRooms}
        </div>
        {daysData.map((ele, idx) => (
          <div
            key={idx}
            className="border-r border-[#ddd] last:border-r-0 p-3 w-[18%] bg-[#333] text-white text-center"
          >
            {ele.day}[{ele.num}]
          </div>
        ))}
      </div>
    </>
  );
};

const Content = ({ data = [] }) => {
  return (
    <div>
      {data.map((ele, idx) => (
        <div className="flex border-b border-[#ddd] last:border-b-0" key={idx}>
          <div className="w-[10%] flex items-center justify-center p-3 border-[#ddd] border-r">
            <p>{ele.roomNumber}</p>
          </div>
          {ele.days.map((e, i) => (
            <div key={i} className="w-[18%] flex items-center justify-center p-3 border-[#ddd] border-r">
              {e.status}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default RoomDiary;
