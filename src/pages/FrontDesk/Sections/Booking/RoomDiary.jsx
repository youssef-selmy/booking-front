import React, { useState } from "react";
import Section from "../../../../components/Section";

const RoomDiary = () => {
  const [data, setData] = useState([
    { from: "", to: "", number: "1", state: "", name: "Test" },
    { from: "", to: "", number: "2", state: "", name: "Test" },
    { from: "", to: "", number: "3", state: "", name: "Test" },
    { from: "", to: "", number: "4", state: "", name: "Test" },
    { from: "", to: "", number: "5", state: "", name: "Test" },
    { from: "", to: "", number: "6", state: "", name: "Test" },
    { from: "", to: "", number: "7", state: "", name: "Test" },
    { from: "", to: "", number: "8", state: "", name: "Test" },
    { from: "", to: "", number: "9", state: "", name: "Test" },
    { from: "", to: "", number: "10", state: "", name: "Test" },
  ]);
  return (
    <Section extraPadding classname="px-5 w-full pb-5">
      <div className="w-full bg-white border border-[#ddd] rounded">
        <Head />
        <Content data={data} />
      </div>
    </Section>
  );
};

const Head = () => {
  return (
    <>
      <div className="border-b border-[#ddd] flex justify-center items-center w-full p-3">
        <p className="text-lg">Septemper 2025</p>
      </div>
      <div className="border-b border-[#ddd] flex">
        <div className="border-r border-[#ddd] p-3 w-[10%] text-center">
          Total Rooms: 120
        </div>
        <div className="border-r border-[#ddd] p-3 w-[18%] bg-[#333] text-white text-center">
          Tuseday[05]
        </div>
        <div className="border-r border-[#ddd] p-3 w-[18%] bg-[#333] text-white text-center">
          Tuseday[06]
        </div>
        <div className="border-r border-[#ddd] p-3 w-[18%] bg-[#333] text-white text-center">
          Tuseday[07]
        </div>
        <div className="border-r border-[#ddd] p-3 w-[18%] bg-[#333] text-white text-center">
          Tuseday[08]
        </div>
        <div className="p-3 w-[18%] bg-[#333] text-white text-center">
          Tuseday[09]
        </div>
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
            <p>{ele.number}</p>
          </div>
          <div className="w-[18%] flex items-center justify-center p-3 border-[#ddd] border-r">
            {ele.name}
          </div>
          <div className="w-[18%] flex items-center justify-center p-3 border-[#ddd] border-r">
            {ele.name}
          </div>
          <div className="w-[18%] flex items-center justify-center p-3 border-[#ddd] border-r">
            {ele.name}
          </div>
          <div className="w-[18%] flex items-center justify-center p-3 border-[#ddd] border-r">
            {ele.name}
          </div>
          <div className="w-[18%] flex items-center justify-center p-3">
            {ele.name}
          </div>
        </div>
      ))}
    </div>
  );
};
export default RoomDiary;
