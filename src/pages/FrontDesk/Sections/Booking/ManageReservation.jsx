import { useEffect, useState } from "react";
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
import api from "../../../../../api/axios";
import Button from "../../../../components/Button";

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
        {data.map((ele, idx) => (
          <TableRow key={idx} rowNum={idx}>
            <TableData>{ele.confirmationNumber}</TableData>
            <TableData>{ele.mainGuestName}</TableData>
            <TableData>{ele.travelAgent.name}</TableData>
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
          { name: "checked-in", value: "checked-in" },
          { name: "checked-out", value: "checked-out" },
        ]}
        value={
          filters?.stayStatus
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
