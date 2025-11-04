import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import InputContainer from "../../../../components/InputContainer";

const HotelInfo = ({ data }) => {
  return (
    <Card className="flex flex-col gap-5 w-fit">
      <h2 className="font-medium text-xl">Hotel Info</h2>
      <InputContainer>
        <Input title="Name" readOnly value={data.name} />
        <Input title="Location" readOnly value={data.location} />
      </InputContainer>
      <InputContainer>
        <Input title="Phone Number" readOnly value={data.phoneNumber} />
        <Input title="Email" readOnly value={data.email} />
      </InputContainer>
      <InputContainer>
        <Input title="Total Rooms" readOnly value={data.totalRooms} />
        <Input title="Total Owners" readOnly value={data.totalOwners} />
      </InputContainer>
    </Card>
  );
};

export default HotelInfo