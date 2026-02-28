import React, { useEffect, useState, useRef } from "react";
import Section from "../../../../components/Section";
import useTable from "../../../../../hooks/useTable";
import Table from "../../../../components/Table/Table";
import api from "../../../../../api/axios";
import Input from "../../../../components/Input";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import Card from "../../../../components/Card";
import html2pdf from "html2pdf.js";

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
  const containerRef = useRef(null);
  const handleDownload = () => {
    if (!containerRef.current) return;
    html2pdf(containerRef.current, {
      margin: 10,
      filename: `casher_report.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    });
  };

  return (
    <Section extraPadding classname="w-full p-5">
      <div ref={containerRef}>
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

export default Casher;
