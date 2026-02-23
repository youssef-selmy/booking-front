import React, { useEffect, useState } from "react";
import useTable from "../../../../../hooks/useTable";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import api from "../../../../../api/axios";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import SelectMenu from "../../../../components/SelectMenu";

const FolioHistory = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [travelAgentOptions, setTravelAgentOptions] = useState([]);

  useEffect(() => {
    const handle = async () => {
      const { data } = await api.get("travel-agents");
      setTravelAgentOptions([
        { id: 0, name: "All", ignore: true },
        ...data.data,
      ]);
    };
    handle();
  }, []);

  useEffect(() => {
    const handle = async () => {
      setLoading(true);
      const { data } = await api.get(
        `reports/folio-history?${new URLSearchParams(filters).toString()}`,
      );
      setData(data.data);
      setSummary(data.summary);
      setLoading(false);
    };
    handle();
  }, [filters]);
  return (
    <Section extraPadding classname="flex flex-col gap-5 w-full p-5">
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
        <SelectMenu
          title="Travel Agent"
          options={travelAgentOptions}
          value={travelAgentOptions.find((e) => e._id === filters.travelAgent)}
          setValue={(v) => {
            if (v.ignore) {
              setFilters((o) => {
                const { travelAgent, ...rest } = o;
                return rest;
              });
            } else setFilters((o) => ({ ...o, travelAgent: v._id }));
          }}
        />
      </Card>

      <Card className="flex gap-5">
        <Input title="Total Paid" value={summary?.totalPaid} readOnly />
        <Input
          title="Total Remaining"
          value={summary?.totalRemaining}
          readOnly
        />
        <Input title="Total Revenue" value={summary?.totalRevenue} readOnly />
      </Card>
      <Table
        loading={loading}
        head={[
          "Confirmation Number",
          "Guest",
          "Travel Agent",
          "Total Paid",
          "Total Remaining",
          "Total Amount",
        ]}
      >
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.reservationId}</TableData>
            <TableData>{ele.guest}</TableData>
            <TableData>{ele.travelAgent?.name ?? "-"}</TableData>
            <TableData>{ele.paidAmount}</TableData>
            <TableData>{ele.remainingAmount}</TableData>
            <TableData>{ele.totalAmount}</TableData>
          </TableRow>
        ))}
      </Table>
    </Section>
  );
};

export default FolioHistory;
