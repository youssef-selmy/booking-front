import { useEffect, useMemo, useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import TableLink from "../../../../components/Table/TableLink";
import { HiLink } from "react-icons/hi2";
import ErrorsBlock from "../../../../components/ErrorsBlock";
import api from "../../../../../api/axios";
import Popup from "../../../../components/Popup";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

const NoShow = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [mode, setMode] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const handle = async () => {
      try {
        const { data } = await api.get(`front-office/noshow`);
        setData(data.data);
      } catch (error) {
        setErrors([error?.response?.data?.message || "Something went wrong"]);
      } finally {
        setLoading(false);
      }
    };
    handle();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const guest = row.mainGuestName?.toLowerCase() || "";
      const confirmation = `${row.confirmationNumber || ""}`.toLowerCase();
      const arriveDate = row.arriveDate?.split("T")[0];

      if (filters.guest && !guest.includes(filters.guest.toLowerCase())) {
        return false;
      }
      if (
        filters.confirmationNumber &&
        !confirmation.includes(filters.confirmationNumber.toLowerCase())
      ) {
        return false;
      }
      if (filters.fromDate && (!arriveDate || arriveDate < filters.fromDate)) {
        return false;
      }
      if (filters.toDate && (!arriveDate || arriveDate > filters.toDate)) {
        return false;
      }
      if (filters.minRooms && Number(row.roomsCount) < Number(filters.minRooms)) {
        return false;
      }
      if (filters.maxRooms && Number(row.roomsCount) > Number(filters.maxRooms)) {
        return false;
      }
      if (
        filters.minNights &&
        Number(row.reservedNights) < Number(filters.minNights)
      ) {
        return false;
      }
      if (
        filters.maxNights &&
        Number(row.reservedNights) > Number(filters.maxNights)
      ) {
        return false;
      }
      return true;
    });
  }, [data, filters]);

  return (
    <Section extraPadding classname="w-full px-5">
      <ErrorsBlock globalErrors={errors} />
      <Table
        loading={loading}
        head={[
          "Confirmation Number",
          "Main Guest Name",
          "Rooms Count",
          "Reserved Nights",
          "Total",
          "Paid",
          "Arrive Date",
          "Details",
        ]}
        showFilters
        setMode={setMode}
      >
        {filteredData.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.confirmationNumber}</TableData>
            <TableData>{ele.mainGuestName}</TableData>
            <TableData>{ele.roomsCount}</TableData>
            <TableData>{ele.reservedNights}</TableData>
            <TableData>{ele.total}</TableData>
            <TableData>{ele.paid}</TableData>
            <TableData>{ele.arriveDate?.split("T")[0]}</TableData>
            <TableLink
              link={`/front-desk/reservation/${ele.confirmationNumber}`}
            >
              <HiLink />
            </TableLink>
          </TableRow>
        ))}
      </Table>
      {mode === "Filters" && (
        <FiltersPopup
          setMode={setMode}
          filters={filters}
          setFilters={setFilters}
          dateLabel="Arrival Date"
        />
      )}
    </Section>
  );
};

const FiltersPopup = ({ setMode, filters, setFilters, dateLabel }) => {
  const [localFilters, setLocalFilters] = useState(filters || {});

  const applyFilters = () => {
    const cleaned = Object.fromEntries(
      Object.entries(localFilters).filter(
        ([key, value]) =>
          key && value !== "" && value !== null && value !== undefined,
      ),
    );
    setFilters(cleaned);
    setMode(null);
  };

  const clearFilters = () => {
    setFilters({});
    setMode(null);
  };

  return (
    <Popup title="Filters" setMode={setMode}>
      <Input
        title="Guest Name"
        value={localFilters.guest || ""}
        setValue={(v) => setLocalFilters((o) => ({ ...o, guest: v }))}
      />
      <Input
        title="Confirmation No."
        value={localFilters.confirmationNumber || ""}
        setValue={(v) =>
          setLocalFilters((o) => ({ ...o, confirmationNumber: v }))
        }
      />
      <Input
        type="date"
        title={`${dateLabel} From`}
        value={localFilters.fromDate || ""}
        setValue={(v) => setLocalFilters((o) => ({ ...o, fromDate: v }))}
      />
      <Input
        type="date"
        title={`${dateLabel} To`}
        value={localFilters.toDate || ""}
        setValue={(v) => setLocalFilters((o) => ({ ...o, toDate: v }))}
      />
      <Input
        type="number"
        title="Min Rooms"
        value={localFilters.minRooms || ""}
        setValue={(v) => setLocalFilters((o) => ({ ...o, minRooms: v }))}
      />
      <Input
        type="number"
        title="Max Rooms"
        value={localFilters.maxRooms || ""}
        setValue={(v) => setLocalFilters((o) => ({ ...o, maxRooms: v }))}
      />
      <Input
        type="number"
        title="Min Nights"
        value={localFilters.minNights || ""}
        setValue={(v) => setLocalFilters((o) => ({ ...o, minNights: v }))}
      />
      <Input
        type="number"
        title="Max Nights"
        value={localFilters.maxNights || ""}
        setValue={(v) => setLocalFilters((o) => ({ ...o, maxNights: v }))}
      />
      <Button className="w-[220px]" onClick={applyFilters}>
        Apply
      </Button>
      <Button className="w-[220px]" onClick={clearFilters}>
        Clear
      </Button>
    </Popup>
  );
};

export default NoShow;
