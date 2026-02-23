import { useEffect, useState } from "react";
import Section from "../../../../../components/Section";
import Button from "../../../../../components/Button";
import MainInfo from "./MainInfo";
import CompanyInfo from "./CompanyInfo";
import Rooms from "./Rooms";
import Payments from "./Payments";
import Popup from "../../../../../components/Popup";
import ErrorsBlock from "../../../../../components/ErrorsBlock";
import api from "../../../../../../api/axios";
import { useNavigate } from "react-router-dom";

const CreatePosting = () => {
  const navigate = useNavigate();
  const [mainInfo, setMainInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    nationality: "",
    idNumber: "",
  });
  const [travelAgent, setTravelAgent] = useState();
  const [reserveDate, setReserveDate] = useState({ checkIn: "", checkOut: "" });
  const [companyInfo, setCompanyInfo] = useState([]);
  const [rooms, setRooms] = useState();
  const [payment, setPayment] = useState({ total: 0, paid: 0, method: "" });
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [glopalErrors, setGlopalErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([])

  const createReservation = async () => {
    if (
      !validator(mainInfo) ||
      !validator(reserveDate) ||
      !selectedRoomsValidator()
    )
      return;

    const mainGuest = mainInfo;
    const additionalGuests = companyInfo;
    const rooms = selectedRooms.map((e) => ({
      room: e._id,
      perDay: e.perDay,
      package: e.package?._id,
    }));
    const payments = [{ amount: payment.paid, method: payment.method }];
    const checkIn = reserveDate.checkIn;
    const checkOut = reserveDate.checkOut;

    const reservationData = {
      mainGuest,
      additionalGuests,
      rooms,
      checkIn,
      checkOut,
      travelAgent: travelAgent?._id,
    };
    if (payment.paid) reservationData.payments = payments;

    try {
      setLoading(true);
      const { data } = await api.post("reservation", reservationData);

      navigate(`/front-desk/reservation/${data.data._id}/main-info`);
    } catch (error) {
      setErrors([error.response.data.message])
    } finally {
      setLoading(false);
    }
  };

  const validator = (data) => {
    const errorsArr = [];
    for (const [key, val] of Object.entries(data))
      if (!val) {
        errorsArr.push(`${key}: is Required`);
      }
    if (errorsArr.length > 0) {
      setGlopalErrors(errorsArr);
      return false;
    }
    return true;
  };

  const selectedRoomsValidator = () => {
    if (selectedRooms.length <= 0) return false;

    const roomsPriceErrors = [];
    selectedRooms.forEach((e) => {
      if (!e.perDay)
        roomsPriceErrors.push(
          `Room ${e.roomNumber}: must have price pre night`,
        );
    });
    if (roomsPriceErrors.length > 0) {
      setGlopalErrors(roomsPriceErrors);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (
      selectedRooms.length <= 0 ||
      !reserveDate.checkIn ||
      !reserveDate.checkOut
    )
      return;
    let total = 0;
    const reservedDays = getDaysDifference(
      reserveDate.checkIn,
      reserveDate.checkOut,
    );
    for (let i = 0; i < selectedRooms.length; i++) {
      if (!selectedRooms[i].perDay) continue;
      total += selectedRooms[i].perDay * reservedDays;
      if (!selectedRooms[i].package) continue;
      total += selectedRooms[i].package.price;
    }
    setPayment((prev) => ({ ...prev, total: total }));
  }, [selectedRooms]);

  const getDaysDifference = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  return (
    <Section extraPadding classname="px-5 w-full flex flex-col gap-5 pb-5">
      <ErrorsBlock globalErrors={errors} />
      <MainInfo
        mainInfo={mainInfo}
        setMainInfo={setMainInfo}
        date={reserveDate}
        setDate={setReserveDate}
        travelAgent={travelAgent}
        setTravelAgent={setTravelAgent}
      />
      <CompanyInfo companyInfo={companyInfo} setCompanyInfo={setCompanyInfo} />
      <Rooms
        rooms={rooms}
        setRooms={setRooms}
        reserveDate={reserveDate}
        selectedRooms={selectedRooms}
        setSelectedRooms={setSelectedRooms}
      />
      <Payments payment={payment} setPayment={setPayment} />
      <Button
        className="p-4 text-xl"
        disabled={
          loading ||
          selectedRooms.length <= 0 ||
          (payment.paid && !payment.method)
        }
        onClick={createReservation}
      >
        Create Reservation
      </Button>
      {glopalErrors.length > 0 && (
        <Popup
          title="Errors"
          globalErrors={glopalErrors}
          setMode={(e) => setGlopalErrors([])}
        ></Popup>
      )}
    </Section>
  );
};

export default CreatePosting;
