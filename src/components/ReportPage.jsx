import React, { useEffect, useState, useRef } from "react";
import Section from "./Section";
import Table from "./Table/Table";
import TableRow from "./Table/TableRow";
import TableData from "./Table/TableData";
import api from "../../api/axios";
import Input from "./Input";
import html2pdf from "html2pdf.js";

/**
 * Generic report page component.
 *
 * Props:
 *  - title: string to display above table
 *  - endpoint: path after `/reports/` to query (eg. "expected-arrivals")
 *  - columns: array of header strings
 *  - mapper: item => array of cell values
 *  - filtersConfig (optional): array of { name, type, label } that will be rendered as inputs
 */
const ReportPage = ({
  title,
  endpoint,
  columns,
  mapper,
  filtersConfig = [],
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const q = new URLSearchParams(filters).toString();
      const { data: res } = await api.get(
        `reports/${endpoint}${q ? `?${q}` : ""}`,
      );
      // some endpoints return an object instead of { data: [...] }
      setData(res.data ?? res);
      setLoading(false);
    };
    fetch();
  }, [endpoint, filters]);

  const handleFilterChange = (name, value) => {
    setFilters((o) => ({ ...o, [name]: value }));
  };

  const containerRef = useRef(null);

  const handleDownload = () => {
    if (!containerRef.current) return;
    html2pdf(containerRef.current, {
      margin: 10,
      filename: `${title.replace(/\s+/g, "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    });
  };

  return (
    <Section extraPadding classname="w-full p-5">
      <div ref={containerRef}>
        {filtersConfig.length > 0 && (
          <div className="flex gap-5 mb-5">
            {filtersConfig.map((f) => (
              <Input
                key={f.name}
                title={f.label}
                type={f.type || "text"}
                value={filters[f.name] || ""}
                setValue={(v) => handleFilterChange(f.name, v)}
              />
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-medium">{title}</h2>
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            Download PDF
          </button>
        </div>

        <Table loading={loading} head={columns}>
          {(Array.isArray(data) ? data : [data]).map((item, idx) => {
            const cells = mapper(item);
            return (
              <TableRow key={idx} rowNum={idx}>
                {cells.map((cell, i) => (
                  <TableData key={i}>{cell}</TableData>
                ))}
              </TableRow>
            );
          })}
        </Table>

        {loading && <p>Loading...</p>}
      </div>
    </Section>
  );
};

export default ReportPage;
