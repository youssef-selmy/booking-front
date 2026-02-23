import React, { useEffect, useState } from "react";
import Section from "../../../../components/Section";
import useTable from "../../../../../hooks/useTable";
import Table from "../../../../components/Table/Table";
import api from "../../../../../api/axios";
import Input from "../../../../components/Input";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import Card from "../../../../components/Card";

const Casher = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState();

  useEffect(() => {
    const handle = async () => {
      setLoading(true);
      const { data } = await api.get(
        `reports/cashier?${new URLSearchParams(filters).toString()}`,
      );
      setData(data.summary);
      setLoading(false);
    };
    handle();
  }, [filters]);
  return (
    <Section extraPadding classname="w-full p-5">
      <Card className="flex gap-5 mb-5">
        <Input
          title="From"
          type="date"
          value={filters?.fromDate}
          setValue={(v) => setFilters((o) => ({ ...o, fromDate: v }))}
        />
        <Input
          title="To"
          type="date"
          value={filters?.toDate}
          setValue={(v) => setFilters((o) => ({ ...o, toDate: v }))}
        />
        <Input
          title="Method"
          value={filters?.stayStatus}
          setValue={(v) => setFilters((o) => ({ ...o, method: v }))}
        />
      </Card>
      {!loading && (
        <div className="w-full flex flex-col gap-5">
          <Card className="flex gap-5 w-full">
            <Input title="Total Cash" value={data.totalCash} readOnly />
            <Input title="Grand Total" value={data.grandTotal} readOnly />
          </Card>
          <Table head={["Method", "Total Amout", "Transactions"]}>
            {data.breakdown.map((ele, idx) => (
              <TableRow key={idx} rowNum={idx}>
                <TableData>{ele._id}</TableData>
                <TableData>{ele.totalAmount}</TableData>
                <TableData>{ele.transactions}</TableData>
              </TableRow>
            ))}
          </Table>
        </div>
      )}
      {loading && <p>Loading....</p>}
    </Section>
  );
};

export default Casher;
