import React, { useState } from 'react'
import Card from '../../../components/Card';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Table from '../../../components/Table/Table';
import TableRow from '../../../components/Table/TableRow';
import TableData from '../../../components/Table/TableData';
import { FaRegTrashCan } from 'react-icons/fa6';
import Section from '../../../components/Section';

const MainInfo = () => {
  return (
    <Section extraPadding classname='flex flex-col gap-5'>
        <MainGuestInfo />
        <CompanyInfo />
    </Section>
  )
}

const MainGuestInfo = ({ mainInfo, setMainInfo, date, setDate }) => {
  return (
    <Card className="w-full">
      <h2 className="text-2xl font-medium">Main Guest Info</h2>
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

export default MainInfo