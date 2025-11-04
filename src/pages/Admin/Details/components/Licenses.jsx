import Card from "../../../../components/Card";
import InputContainer from "../../../../components/InputContainer";
import Input from "../../../../components/Input";

const Licenses = ({ data }) => {
  return (
    <Card className="flex flex-col gap-5">
      <h2 className="font-medium text-xl">Licenses</h2>
      <InputContainer>
        <Input title="Commercial register" readOnly value={data.name} />
        <Input title="Tax card" readOnly value={data.location} />
      </InputContainer>
      <Input title="Licensing" readOnly value={data.location} />
    </Card>
  );
};

export default Licenses