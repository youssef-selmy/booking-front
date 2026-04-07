import { useMemo, useState } from "react";
import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import Popup from "../../../../components/Popup";
import Input from "../../../../components/Input";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import TableLink from "../../../../components/Table/TableLink";
import { HiLink } from "react-icons/hi2";
import useTable from "../../../../../hooks/useTable";
import SelectMenu from "../../../../components/SelectMenu";
import Button from "../../../../components/Button";

const normalizeStayStatus = (status = "") =>
  String(status)
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const ManageReservation = () => {
  const {
    data,
    mode,
    loading,
    paginationData,
    next,
    prev,
    setMode,
    filters,
    setFilters,
  } = useTable("reservation");

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const guest = row.mainGuestName?.toLowerCase() || "";
      const confirmation = `${row?.confirmationNumber || ""}`.toLowerCase();
      const arriveDate = row.arriveDate?.split("T")[0];
      const reservationStatus = `${row?.status || ""}`.toLowerCase().trim();
      const stayStatus = normalizeStayStatus(row?.stayStatus);

      if (stayStatus === "checked in" || stayStatus === "in house") {
        return false;
      }
      if (filters.guest && !guest.includes(filters.guest.toLowerCase())) {
        return false;
      }
      if (
        filters.confirmationNumber &&
        !confirmation.includes(filters.confirmationNumber.toLowerCase().trim())
      ) {
        return false;
      }
      if (filters.fromDate && (!arriveDate || arriveDate < filters.fromDate)) {
        return false;
      }
      if (filters.toDate && (!arriveDate || arriveDate > filters.toDate)) {
        return false;
      }
      if (
        filters.status &&
        reservationStatus !== filters.status.toLowerCase().trim()
      ) {
        return false;
      }
      if (
        filters.stayStatus &&
        stayStatus !== normalizeStayStatus(filters.stayStatus)
      ) {
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
    <Section extraPadding classname="px-5 w-full">
      <Table
        pagenationData={paginationData}
        loading={loading}
        next={next}
        prev={prev}
        head={[
          "Confirmation Number",
          "Main Guest Name",
          "Travel Agent",
          "Rooms Count",
          "Arrive Date",
          "Reserved Nights",
          "Details",
        ]}
        showFilters
        setMode={setMode}
      >
        {filteredData.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.confirmationNumber}</TableData>
            <TableData>{ele.mainGuestName}</TableData>
            <TableData>{ele.travelAgent?.name}</TableData>
            <TableData>{ele.roomsCount}</TableData>
            <TableData>{ele.arriveDate?.split("T")[0]}</TableData>
            <TableData>{ele.reservedNights}</TableData>
            <TableLink
              link={`/front-desk/reservation/${ele.confirmationNumber}`}
            >
              <HiLink />
            </TableLink>
          </TableRow>
        ))}
      </Table>
      {mode === "Filters" && (
        <Filters
          setMainFilters={setFilters}
          mainFilters={filters}
          setMode={setMode}
        />
      )}
    </Section>
  );
};

const Filters = ({ setMode, mainFilters, setMainFilters }) => {
  const [filters, setFilters] = useState(mainFilters || {});

  const saveFilters = () => {
    // 🔥 Clean empty values (important for backend)
    const cleaned = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, v]) => v !== "" && v !== null && v !== undefined
      )
    );

    setMainFilters(cleaned);
    setMode(null);
  };

  return (
    <Popup title="Filters" setMode={setMode}>
      {/* Guest Name (MATCHES BACKEND: guest) */}
      <Input
        title="Guest Name"
        value={filters?.guest || ""}
        setValue={(v) =>
          setFilters((o) => ({ ...o, guest: v }))
        }
      />

      <Input
        title="Confirmation No."
        value={filters?.confirmationNumber || ""}
        setValue={(v) =>
          setFilters((o) => ({ ...o, confirmationNumber: v }))
        }
      />

      {/* From Date (MATCHES BACKEND: fromDate) */}
      <Input
        type="date"
        title="From Date"
        value={filters?.fromDate || ""}
        setValue={(v) =>
          setFilters((o) => ({ ...o, fromDate: v }))
        }
      />

      {/* To Date (MATCHES BACKEND: toDate) */}
      <Input
        type="date"
        title="To Date"
        value={filters?.toDate || ""}
        setValue={(v) =>
          setFilters((o) => ({ ...o, toDate: v }))
        }
      />

      {/* Status Filter */}
      <SelectMenu
        title="Reservation Status"
        options={[
          { name: "All", ignore: true },
          { name: "pending", value: "pending" },
          { name: "confirmed", value: "confirmed" },
          { name: "canceled", value: "canceled" },
          { name: "completed", value: "completed" },
        ]}
        value={
          filters?.status
            ? { name: filters.status, value: filters.status }
            : { name: "All", ignore: true }
        }
        setValue={(v) => {
          if (v.ignore) {
            setFilters((o) => {
              const { status, ...rest } = o;
              return rest;
            });
          } else {
            setFilters((o) => ({ ...o, status: v.value }));
          }
        }}
      />

      {/* Stay Status */}
      <SelectMenu
        title="Stay Status"
        options={[
          { name: "All", ignore: true },
          { name: "reserved", value: "reserved" },
          { name: "checked-out", value: "checked-out" },
        ]}
        value={
          filters?.stayStatus &&
          normalizeStayStatus(filters.stayStatus) !== "checked in" &&
          normalizeStayStatus(filters.stayStatus) !== "in house"
            ? { name: filters.stayStatus, value: filters.stayStatus }
            : { name: "All", ignore: true }
        }
        setValue={(v) => {
          if (v.ignore) {
            setFilters((o) => {
              const { stayStatus, ...rest } = o;
              return rest;
            });
          } else {
            setFilters((o) => ({ ...o, stayStatus: v.value }));
          }
        }}
      />

      {/* Rooms Range */}
      <Input
        type="number"
        title="Min Rooms"
        value={filters?.minRooms || ""}
        setValue={(v) =>
          setFilters((o) => ({ ...o, minRooms: v }))
        }
      />

      <Input
        type="number"
        title="Max Rooms"
        value={filters?.maxRooms || ""}
        setValue={(v) =>
          setFilters((o) => ({ ...o, maxRooms: v }))
        }
      />

      {/* Nights Range */}
      <Input
        type="number"
        title="Min Nights"
        value={filters?.minNights || ""}
        setValue={(v) =>
          setFilters((o) => ({ ...o, minNights: v }))
        }
      />

      <Input
        type="number"
        title="Max Nights"
        value={filters?.maxNights || ""}
        setValue={(v) =>
          setFilters((o) => ({ ...o, maxNights: v }))
        }
      />

      <Button full onClick={saveFilters}>
        Apply Filters
      </Button>
    </Popup>
  );
};

export default ManageReservation;
