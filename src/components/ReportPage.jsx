import React, { useEffect, useState } from "react";
import Section from "./Section";
import Table from "./Table/Table";
import TableRow from "./Table/TableRow";
import TableData from "./Table/TableData";
import api from "../../api/axios";
import Input from "./Input";

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

  return (
    <Section extraPadding classname="w-full p-5">
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

      <h2 className="text-2xl font-medium mb-4">{title}</h2>

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
    </Section>
  );
};

export default ReportPage;
