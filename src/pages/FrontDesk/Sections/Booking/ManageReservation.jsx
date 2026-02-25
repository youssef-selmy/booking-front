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
  const [filters, setFilters] = useState(mainFilters);
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

  const saveFilters = () => {
    console.log(filters);
    setMainFilters(filters);
    setMode(null);
  };

  return (
    <Popup title="Filters" setMode={setMode}>
      <Input
        title="Confirmation Number"
        value={filters?.confirmationNumber}
        setValue={(v) => setFilters((o) => ({ ...o, confirmationNumber: v }))}
      />
      <Input
        title="Guest Name"
        value={filters?.toDate}
        setValue={(v) => setFilters((o) => ({ ...o, guest: v }))}
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
      <Input
        type="date"
        title="Arrive At"
        value={filters?.toDate}
        setValue={(v) => setFilters((o) => ({ ...o, arriveAt: v }))}
      />
      <Input
        type="date"
        title="Departure At"
        value={filters?.toDate}
        setValue={(v) => setFilters((o) => ({ ...o, departureAt: v }))}
      />
      <Button full onClick={saveFilters}>
        Filter
      </Button>
    </Popup>
  );
};

export default ManageReservation;
