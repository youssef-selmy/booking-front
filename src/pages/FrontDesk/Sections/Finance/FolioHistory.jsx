import React, { useEffect, useState, useRef } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import api from "../../../../../api/axios";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import SelectMenu from "../../../../components/SelectMenu";
import html2pdf from "html2pdf.js";

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
  const containerRef = useRef(null);
  const handleDownload = () => {
    if (!containerRef.current) return;
    html2pdf(containerRef.current, {
      margin: 10,
      filename: `folio_history.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    });
  };

  return (
    <Section extraPadding classname="flex flex-col gap-5 w-full p-5">
      <div ref={containerRef}>
  <Card className="flex gap-5 mb-5 flex-wrap">
  <Input
    title="Confirmation Number"
    value={filters?.confirmationNumber || ""}
    setValue={(v) =>
      setFilters((o) => ({
        ...o,
        confirmationNumber: v || undefined // 🔥 important to remove empty param
      }))
    }
  />

  <Input
    title="From"
    type="date"
    value={filters?.fromDate || ""}
    setValue={(v) =>
      setFilters((o) => ({
        ...o,
        fromDate: v || undefined
      }))
    }
  />

  <Input
    title="To"
    type="date"
    value={filters?.toDate || ""}
    setValue={(v) =>
      setFilters((o) => ({
        ...o,
        toDate: v || undefined
      }))
    }
  />

  <SelectMenu
    title="Travel Agent"
    options={travelAgentOptions}
    value={travelAgentOptions.find(
      (e) => e._id === filters.travelAgent
    )}
    setValue={(v) => {
      if (v.ignore) {
        setFilters((o) => {
          const { travelAgent, ...rest } = o;
          return rest;
        });
      } else {
        setFilters((o) => ({
          ...o,
          travelAgent: v._id
        }));
      }
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
      </div>
      <button
        onClick={handleDownload}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download PDF
      </button>
    </Section>
  );
};

export default FolioHistory;
