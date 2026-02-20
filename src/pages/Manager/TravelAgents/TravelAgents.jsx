import Section from "../../../components/Section";
import Table from "../../../components/Table/Table";
import TableRow from "../../../components/Table/TableRow";
import TableData from "../../../components/Table/TableData";
import TableEdit from "../../../components/Table/TableEdit";
import AddPopup from "./AddPopup";
import EditPopup from "./EditPopup";
import FiltersPopup from "./FiltersPopup";
import useTable from "../../../../hooks/useTable";

const TravelAgents = () => {
  const {
    data,
    setData,
    mode,
    setMode,
    editItem,
    setEditItem,
    paginationData,
    setFilters,
    next,
    prev,
    loading,
    globalErrors,
  } = useTable("travel-agents");

  return (
    <>
      <Section classname="p-5 pt-[90px] flex flex-col gap-5">
        <Table
          head={["Name", "Edit"]}
          smallArr={["Edit"]}
          setMode={setMode}
          showFilters={true}
          showAdd={true}
          pagenationData={paginationData}
          next={next}
          prev={prev}
          loading={loading}
        >
          {data.map((ele, idx) => (
            <TableRow key={idx} rowNum={idx}>
              <TableData>{ele.name}</TableData>
              <TableEdit
                setEditItem={() => setEditItem(ele)}
                setMode={setMode}
              />
            </TableRow>
          ))}
        </Table>
      </Section>
      {mode === "Filters" && (
        <FiltersPopup mode={mode} setMode={setMode} setFilters={setFilters} />
      )}
      {mode === "Add" && (
        <AddPopup
          mode={mode}
          setMode={setMode}
          setData={setData}
          dataLength={data.length}
        />
      )}
      {mode === "Edit" && (
        <EditPopup
          mode={mode}
          setMode={setMode}
          editItem={editItem}
          setEditItem={setEditItem}
        />
      )}
    </>
  );
};

export default TravelAgents;
