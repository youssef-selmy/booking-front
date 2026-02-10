import Section from "../../../../components/Section";
import Table from "../../../../components/Table/Table";
import TableRow from "../../../../components/Table/TableRow";
import TableData from "../../../../components/Table/TableData";
import TableEdit from "../../../../components/Table/TableEdit";
import useTable from "../../../../../hooks/useTable";
import EditPopup from "./EditPopup";
import AddPopup from "./AddPopup";
import FiltersPopup from "./FiltersPopup";

const Managment = () => {
  const {
    data,
    setData,
    loading,
    mode,
    setMode,
    paginationData,
    next,
    prev,
    editItem,
    setEditItem,
    filters,
    setFilters,
  } = useTable("rooms");

  return (
    <>
      <Section extraPadding classname="p-5 w-full">
        <Table
          pagenationData={paginationData}
          next={next}
          prev={prev}
          head={[
            "Room No.",
            "Floor",
            "Type",
            "Category",
            "View",
            "Max Adult",
            "Max Children",
            "Edit",
          ]}
          loading={loading}
          setMode={setMode}
          showFilters
          showAdd
        >
          {data.map((ele, idx) => (
            <TableRow key={idx} rowNum={idx}>
              <TableData>{ele.roomNumber}</TableData>
              <TableData>{ele.floor}</TableData>
              <TableData>{ele.type}</TableData>
              <TableData>{ele.category}</TableData>
              <TableData>{ele.view}</TableData>
              <TableData>{ele.maxGuests}</TableData>
              <TableData>{ele.MaxChildren}</TableData>
              <TableEdit
                setEditItem={() => setEditItem(ele)}
                setMode={setMode}
              />
            </TableRow>
          ))}
        </Table>
      </Section>
      {mode === "Filters" && (
        <FiltersPopup mode={mode} setMode={setMode} filters={filters} setFilters={setFilters} />
      )}
      {mode === "Add" && (
        <AddPopup mode={mode} setMode={setMode} setData={setData} />
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

export default Managment;
