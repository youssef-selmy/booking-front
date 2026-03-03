import Table from "../../../components/Table/Table";
import TableData from "../../../components/Table/TableData";
import TableRow from "../../../components/Table/TableRow";
import useTable from "../../../../hooks/useTable";

const formatDateTime = (dateValue) => {
  if (!dateValue) return "-";
  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return String(dateValue);
  return parsedDate.toLocaleString();
};

const formatText = (value) => {
  if (!value) return "-";
  if (typeof value === "string") return value;
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const SettingsLogs = () => {
  const { data, paginationData, next, prev, loading } = useTable("settings/logs");

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Hotel Logs</h2>
      <Table
        head={["Date", "User", "Action", "Target", "Details"]}
        pagenationData={paginationData}
        next={next}
        prev={prev}
        loading={loading}
      >
        {data.map((log, idx) => (
          <TableRow key={log._id || idx} rowNum={idx}>
            <TableData>
              {formatDateTime(
                log.createdAt || log.updatedAt || log.timestamp || log.date
              )}
            </TableData>
            <TableData>
              {formatText(
                log.userName ||
                  log.user?.userName ||
                  log.user?.name ||
                  log.actor ||
                  log.by
              )}
            </TableData>
            <TableData>{formatText(log.action || log.event || log.type)}</TableData>
            <TableData>
              {formatText(log.target || log.entity || log.module || log.section)}
            </TableData>
            <TableData>
              {formatText(log.details || log.message || log.description)}
            </TableData>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};

export default SettingsLogs;
