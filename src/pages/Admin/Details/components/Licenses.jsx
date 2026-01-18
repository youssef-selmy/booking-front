import Card from "../../../../components/Card";
import InputContainer from "../../../../components/InputContainer";
import Input from "../../../../components/Input";

const Licenses = ({ data }) => {
  return (
    <Card className="flex flex-col gap-5">
      <h2 className="font-medium text-xl">Licenses</h2>
      <InputContainer>
        <a href={data.commercialRegister}>commercialRegister</a>
        <a href={data.taxCard}>taxCard</a>
      </InputContainer>
      <a href={data.licensing}>licensing</a>
    </Card>
  );
};

export default Licenses;
