import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Table from "../../../components/Table/Table";
import TableRow from "../../../components/Table/TableRow";
import TableData from "../../../components/Table/TableData";
import Section from "../../../components/Section";
import Button from "../../../components/Button";
import html2pdf from "html2pdf.js";

const Print = () => {
  const { data } = useOutletContext();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (!data) return;
    setRooms(
      data.rooms.map((e) => ({
        arrival: data.checkIn.split("T")[0],
        departure: data.checkOut.split("T")[0],
        room: e.room.roomNumber,
        total: e.perDay * e.nights + (e.package?.price ?? 0),
      })),
    );
  }, [data]);

  const handleSave = async () => {
    const element = document.getElementById('contract');
    html2pdf(element)
  }

  return (
    <Section extraPadding>
      {rooms.length != 0 && <Button onClick={handleSave}>Download</Button>}
      <div className="bg-white mt-5 border w-[40%] mb-5">
        <Details data={rooms} />
      </div>
    </Section>
  );
};

const Details = ({ data }) => {
  return (
    <div id="contract" className="p-10 flex flex-col gap-5">
      <Top />
      <GuestProfile />
      <StayDetails data={data} />
      <Terms />
      <Bottom />
    </div>
  );
};

const Top = () => {
  return (
    <div className="border-b pb-5">
      <h1 className="font-medium text-2xl mb-3">GUEST REGESTRATION CARD</h1>
      <div>
        <p>
          Folio No: <span>____________________</span>
        </p>
        <p>
          Res. No: <span>____________________</span>
        </p>
      </div>
    </div>
  );
};

const GuestProfile = () => {
  return (
    <div>
      <h2 className="font-medium text-xl">1. GUEST PROFILE</h2>
      <div className="mt-5 ">
        <div className="flex gap-20 justify-start">
          <p className="mb-5 flex flex-col">
            Name <span>_____________</span>
          </p>
          <p className="mb-5 flex flex-col">
            PassportID <span>_____________</span>
          </p>
        </div>
        <div className="flex gap-20 justify-start">
          <p className="flex flex-col">
            Nationality <span>_____________</span>
          </p>
          <p className="flex flex-col">
            Age <span>_____________</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const StayDetails = ({ data }) => {
  return (
    <div>
      <h2 className="font-medium text-xl mb-5">2. STAY DETAILS</h2>
      <div>
        <Table head={["Arrival", "Departure", "Room", "Total"]}>
          {data.map((ele, idx) => (
            <TableRow key={idx} rowNum={idx}>
              <TableData>{ele.arrival}</TableData>
              <TableData>{ele.departure}</TableData>
              <TableData>{ele.room}</TableData>
              <TableData>{ele.total}</TableData>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};

const Terms = () => {
  return (
    <div className="border-b pb-5">
      <h2 className="font-medium text-xl mb-5">3. TERMS & CONDITIONS</h2>
      <p>
        1. I certify that the information provided above (including Visa
        details) is accurate and true.
      </p>
      <p>
        2. The hotel is NOT responsible for valuables kept outside the in-room
        safe box.
      </p>
      <p>
        3. Check-out time is 12:00 PM. Late check-out is subject to avilability
        and extra charge
      </p>
      <p>
        4. I agree to the processing of my personal data for security and
        registration purposes in accordance with Egyptian laws.
      </p>
    </div>
  );
};

const Bottom = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p>Guest Signature</p>
        <span>____________________</span>
      </div>
      <div>
        <p>Reception</p>
        <span>____________________</span>
      </div>
    </div>
  );
};

export default Print;
